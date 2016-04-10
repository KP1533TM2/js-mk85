var loadCounter = 0;

var debug = false;

function checkIfMemoryLoaded() {
	if(loadCounter>0) loadCounter--;
	if(loadCounter==0) {
		// If everything is loaded then finish all the preparations and kick off
		glueCPU();
		LCD.timerCallback = function () {
			if(uniquesPressed.length>0)
			{
//				if(uniquesPressed.indexOf("stop")!=-1) MK85CPU.flag_halt = true;
				MK85CPU.cpuctrl |= 0x0400;	// enable CPU clock if anything is pressed
//				if()
			}
			for(var steps = 0; steps < 150; steps++)
			{
				MK85CPU.step();
/*				if(MK85CPU.reg_u16[7] == 0x00f4) {
					console.log("HALT INTERRUPT");
					debug = true;
				}*/
				if(MK85CPU.psw&MK85CPU.flags.H) console.log(MK85CPU.reg_u16[7].toString(16));
			}
		}
		LCD.animate(10);
		
	}
}

function loadBinary(urlBIN, callback) {
	var oReq = new XMLHttpRequest();
	oReq.open("GET", urlBIN, true);
	oReq.responseType = "arraybuffer";
	loadCounter++;
	console.log("To load:", loadCounter);
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
