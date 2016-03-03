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
	
//	var temp = dst.loc;

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


/*
  function Make_JSR : word;		{ 004RDD  ----    JSR     ------ }
  var
    R, temp: word;
  begin
{ The destination of jsr must not be a register, i.e. the address mode must
  not equal zero. }
    if (code and $38) = 0 then Make_JSR := $0004 else
    begin
      opt := WORDSIZE;
      R := (code shr 5) and $E;			{ index of the R register }
      GetLoc (code and $3F);
      temp := loc and $FFFE;			{ temp <- EA }
      GetLoc ($26);				{ SP <- SP-2, stack <- SP }
      ptrw(DstPtr)^ := ptrw(@reg[R])^;		{ (SP) <- R }
      ptrw(@reg[R])^ := ptrw(@reg[R7])^;	{ R <- PC }
      ptrw(@reg[R7])^ := temp;			{ PC <- temp }
      Make_JSR := 0;
    end;
  end {Make_JSR};
  
  */
