CPU.prototype.execJMP = function(code) {
	var dst = this.addressingIP(code&0x3f, false);

	/* if destination location is a register fail with illegal opcode, which
     * is the same vector as bus error */

	if(!("loc" in dst)) throw this.vectors.TRAP_BUS_ERROR;

	this.reg_u16[7] = dst.loc;
	return CPU.prototype.execCode;

};

CPU.prototype.execJSR = function(code) {
	var dst = this.addressingIP(code&0x3f, false);
	if(!("loc" in dst)) throw this.vectors.TRAP_BUS_ERROR;

	var sp = this.addressingIP(0x26, false);
	sp.w(this.reg_u16[(code>>6)&0x7]);				// Put R onto stack
	this.reg_u16[(code>>6)&0x7] = this.reg_u16[7];	// Put PC into R
	this.reg_u16[7] = dst.loc;						// jump
	return CPU.prototype.execCode;
};

CPU.prototype.execRTS = function(code) {
	var r = code&7;
	this.reg_u16[7] = this.reg_u16[r];
	this.reg_u16[r] = this.addressingIP(0x16, false).ru();
	return CPU.prototype.execCode;
};

