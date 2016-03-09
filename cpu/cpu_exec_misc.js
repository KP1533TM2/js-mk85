CPU.prototype.execHALT = function(code) {
	this.cpc = this.reg_u16[7];
	this.cps = this.psw;
	var loc = 0x0078|((this.psw&this.flags.H)?(this.sel&0xff00):0);
	/* jumping to address */
	this.reg_u16[7] = this.access(loc, null, false);
	this.psw = this.access(loc+2, null, false) | this.flags.H;
	return CPU.prototype.execCode;
};

CPU.prototype.execGO = function(code) {
	if(this.psw&this.flags.H) {
		this.reg_u16[7] = this.cpc;
		this.psw = this.cps&(~this.flags.H);
		return CPU.prototype.execCode;
	} else {
		throw this.vectors.TRAP_RESERVED_OPCODE;
	}
};


CPU.prototype.execRTI = function(code) {
	var SP1 = this.addressingIP(0x16, false);
	this.reg_u16[7] = SP1.ru();
	this.reg_u16[6] += 2;
	var SP2 = this.addressingIP(0x16, false);
	this.psw = SP2.ru();
	this.reg_u16[6] += 2;
	if (this.reg_u16[7]>=0xe000) this.psw |= this.flags.H;
	return CPU.prototype.execCode;
};
/*

CPU.prototype.execRTS = function(code) {
	var r = code&7;
	this.reg_u16[7] = this.reg_u16[r];
	this.reg_u16[r] = this.addressingIP(0x16, false).ru();
	return CPU.prototype.execCode;
};


  function Make_RTI : word;		{ 000002  ++++    RTI     ------ }
  begin
    opt := WORDSIZE;
{ stack <- SP, SP <- SP+2, PC <- (stack) }
    ptrw(@reg[R7])^ := ptrw(GetSrc($16))^ and $FFFE;
{ stack <- SP, SP <- SP+2, PSW <- (stack) }
    psw := ptrw(GetSrc($16))^;
    if ptrw(@reg[R7])^ >= $E000 then psw := psw or H_bit;
    Make_RTI := 0;
  end {Make_RTI};

*/
CPU.prototype.execWCPS = function(code) {
	
};
