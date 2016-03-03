CPU.prototype.execJMP = function(code) {
//		console.log("ASDFASDF");
	var dst = this.addressingIP(code&0x3f, false);

	console.log(dst);

	/* if destination location is a register fail with illegal opcode, which
     * is the same vector as bus error */

/*	if("loc" in dst) console.log("loc =",dst.loc.toString(16));
	console.log("memaddr =",dst.memAddr.toString(16));*/


	if(!("loc" in dst)) throw this.vectors.TRAP_BUS_ERROR;

	this.reg_u16[7] = dst.loc;
//	this.reg_u16[7] = dst.ru();
	return CPU.prototype.execCode;

};
