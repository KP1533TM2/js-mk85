var loadCounter = 1;
function checkIfMemoryLoaded() {
	if(loadCounter>0) {
		loadCounter--;
	} else {
		// If everything is loaded then finish all the preparations and kick off
		glueCPU();
		LCD.timerCallback = function () {
			if((KBKeysPressed.length>0)||(GUIKeysPressed.length>0))
			{
				console.log("clock on");
				MK85CPU.cpuctrl |= 0x0400;
			}
			for(var steps = 0; steps < 150; steps++)
			{
				MK85CPU.step();
			}
		}
		LCD.animate(10);
		
	}
}

function loadBinary(urlBIN, callback) {
	var oReq = new XMLHttpRequest();
	oReq.open("GET", urlBIN, true);
	oReq.responseType = "arraybuffer";
	oReq.onload = function (oEvent) {
		var arrayBuffer = oReq.response; // Note: not oReq.responseText
		if (arrayBuffer) {
			console.log(urlBIN, "loaded!");
			if(typeof callback == 'function') callback(arrayBuffer);
		};
	};
	oReq.send(null);
}

var PP = 0;	// CPU parallel port for now

// Attach CPU to everything else
function glueCPU() {
	MK85CPU.readCallback = function (addr) {
		if((addr&0xfffe)==0x0100) return (keysRead(PP)>>((addr&1)?8:0))&0xff;
		if(addr<0x8000) return ROM[addr&0x7FFF];
		if((addr>=0x8000)&&(addr<0x8800)) return RAM[addr&0x7FFF];
		// keyboard column regs
		return 0;
	};

	MK85CPU.writeCallback = function (addr, byteVal) {
		if((addr>0x7f)&&(addr<0xe0)) {	// 0x80...0xDF is LCD contoller memory
			LCD.videoMemory[addr&0x7f] = byteVal;
			return;
		}
		if(addr==0xe0) {			// 0xe0 - LCD cursor register
			LCD.cursorReg = byteVal;
			return;
		}
		if(addr==0x102) {			// 0x102 - keyboard rows
			PP &= 0xff00;
			PP |= byteVal;
			return;
		}
		if(addr==0x103) {			// 0x102 - keyboard rows
			PP &= 0x00ff; 
			PP |= byteVal<<8;
			return;
		}
		if((addr>=0x8000)&&(addr<0x8800)) {
			RAM[addr&0x7FFF] = byteVal;
			return;
		}
		return;
	};
}
