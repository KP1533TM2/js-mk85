CPU.prototype.execHALT = function(code) {
	this.cpc = this.reg_u16[7];
	this.cps = this.psw;
	var loc = 0x0078|((this.psw&this.flags.H)?(this.sel&0xff00):0);
	/* jumping to address */
	this.reg_u16[7] = this.access(loc, null, false);
	this.psw = this.access(loc+2, null, false) | this.flags.H;
	return CPU.prototype.execCode;
};

CPU.prototype.execWCPS = function(code) {
	
};
