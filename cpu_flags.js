
CPU.prototype.checkBitNZ = function(a) {
	/* calculate N and Z bits for the value A */
	this.psw &= ~(this.flags.N|this.flags.Z);
	this.psw |= ((a<0)?this.flags.N:((a==0)?this.flags.Z:0));
};
