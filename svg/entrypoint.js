function MK85(root) {
	this.cpu = new CPU();
//	this.lcd = new MK85_SVG_LCD();
	this.gui = new MK85_SVG_FACE(root);
	this.ram = null;
	this.rom = null;
	this.pp = 0;
	this.breakpoints = [];
	this.breakpointHit = false;
}

MK85.prototype.addBreakpoint = function(addr) {
	if(this.breakpoints.indexOf(addr)==-1) {
		// add breakpoint in the list
		this.breakpoints.push(addr);
	}
};

MK85.prototype.delBreakpoint = function(addr) {
	if(breakpoints.indexOf(addr)!=-1) {
		this.breakpoints.splice(breakpoints.indexOf(addr), 1);
	}
};

MK85.prototype.initializeDefault = function() {
	var self = this;
	this.initializeGUI();

	// throw in some 2k RAM
	this.loadRAMFromURL("../ram.bin");
//	this.ram = new ArrayBuffer(2048);
	
	// throw in some ROM
	this.loadROMFromURL("../rom.bin");
	
	// wire up our CPU to everything else
	this.cpu.readCallback = function (addr) {
		if((addr&0xfffe)==0x0100) return (self.gui.keyRead(self.pp)>>((addr&1)?8:0))&0xff;
		if(addr<0x8000) return self.rom[addr&0x7FFF];
//		if((addr>=0x8000)&&(addr<0x8800)) return self.ram_u8[addr&0x7FFF];
		if((addr>=0x8000)&&(addr<0x8800)) return self.ram[addr&0x7FFF];
		// keyboard column regs
		return 0;
	}
	this.cpu.writeCallback = function (addr, byteVal) {
		if((addr>0x7f)&&(addr<0xe0)) {	// 0x80...0xDF is LCD contoller memory
			self.gui.lcd.videoMemory[addr&0x7f] = byteVal;
			return;
		}
		if(addr==0xe0) {			// 0xe0 - LCD cursor register
			self.gui.lcd.cursorReg = byteVal;
			return;
		}
		if(addr==0x102) {			// 0x102 - keyboard rows
			self.pp &= 0xff00;
			self.pp |= byteVal;
			console.log(self.pp);
			return;
		}
		if(addr==0x103) {			// 0x102 - keyboard rows
			self.pp &= 0x00ff; 
			self.pp |= byteVal<<8;
			return;
		}
		if((addr>=0x8000)&&(addr<0x8800)) {
			self.ram[addr&0x7FFF] = byteVal;
//			self.ram_u8[addr&0x7FFF] = byteVal;
			return;
		}
		return;
	};
	
	// add callback to perform some cpu cycles between frames
	this.gui.lcd.timerCallback = function() {
		if(self.breakpointHit) {
			self.cpu.step();
		} else {
			for(var x = 0; x < 100; x++)
			{
				if(self.gui.keyList.length>0) self.cpu.cpuctrl |= 0x400;
				self.cpu.step();
				if((self.breakpoints!=[])&&(self.breakpoints.indexOf(self.cpu.reg_u16[7]) != -1))
				{
					self.breakpointHit = true;
					self.gui.lcd.stopAnimating();
					console.log("breakpoint", self.cpu.reg_u16[7].toString(16), "hit!");
					break;
				}
			}
		}
	};
	
};
	

MK85.prototype.initializeGUI = function(root) {
	this.gui.initialize();
};

MK85.prototype.attachROM = function(rom_array) {
	this.rom = rom_array;
};

MK85.prototype.loadROMFromURL = function(romURL) {
	var self = this;
	var oReq = new XMLHttpRequest();
	oReq.open("GET", romURL, true);
	oReq.responseType = "arraybuffer";
	oReq.onload = function (oEvent) {
		var arrayBuffer = oReq.response; // Note: not oReq.responseText
		if (arrayBuffer) {
			self.rom = new Uint8Array(arrayBuffer);
			console.log("ROM", romURL, "loaded!");
		};
	};
	oReq.send(null);
};

MK85.prototype.loadRAMFromURL = function(ramURL) {
	var self = this;
	var oReq = new XMLHttpRequest();
	oReq.open("GET", ramURL, true);
	oReq.responseType = "arraybuffer";
	oReq.onload = function (oEvent) {
		var arrayBuffer = oReq.response; // Note: not oReq.responseText
		if (arrayBuffer) {
			self.ram = new Uint8Array(arrayBuffer);
			console.log("RAM", ramURL, "loaded!");
		};
	};
	oReq.send(null);
};


