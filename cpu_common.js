function CPU() {
    this.regBuffer	= new ArrayBuffer(16);
    this.regView	= new DataView(this.regBuffer, 0);
    this.reg_u16	= new Uint16Array(this.regBuffer);
    this.reg_s16	= new Int16Array(this.regBuffer);
    this.reg_u8		= new Uint8Array(this.regBuffer);
    this.reg_s8		= new Int8Array(this.regBuffer);
    
    /* since this is JavaScript and we have no simple solution for static typing and typecasting
     * our registers and variables, we're going to organize a safe static "scratchpad" area where
     * everyhing acts like we expect it to.
     * It's silly, I know :)
     */
    this.scratchpad = new ArrayBuffer(16);
    this.sp_u16		= new Uint16Array(this.scratchpad);
    this.sp_s16		= new Int16Array(this.scratchpad);
    this.sp_u8		= new Uint8Array(this.scratchpad);
    this.sp_s8		= new Int8Array(this.scratchpad);
    
    /* reset state */
    this.nextFun		= CPU.prototype.execVector;
    this.vector			= this.vectors.RESET;
    
    this.regSel         = 0x0000;   // HALT mode
    this.psw            = 0x0000;
    this.pc             = 0x0000;	// to save immediate R7 while reading multiple word instructions
    this.cpc            = 0x0000;
    this.cps            = 0x0000;
    this.sel			= 0x0000;
    this.opcode         = 0x0000;
    
    /* gotta assign those before running anything */
	this.readCallback   = null;
    this.writeCallback  = null;
}

CPU.prototype.access = function(addr,writeVal,isByte) {
	if(!isByte && addr&1) {
		throw this.vectors.TRAP_BUS_ERROR;	// bus error: attempt to read word from odd address
	} // TRAP 4

    if(writeVal === null) {
        return this.readCallback(addr)|(isByte?0:this.readCallback(addr+1)<<8);
    } else {
        this.writeCallback(addr,writeVal&0xFF);
        if(!isByte) this.writeCallback(addr+1,(writeVal>>8)&0xFF);
        return null;
    }
};



CPU.prototype.execCode = function() {
	this.vector = null;

	/* test */
	
	
	
	this.reg_s16[4] = Math.floor((Math.random()*65535)+32768);
	this.reg_s16[5] = Math.floor((Math.random()*65535)+32768);
/*	this.reg_s16[4] = 0x84f2;
	this.reg_s16[5] = 0xd34a;*/

//	this.reg_s16[2] = Math.floor((Math.random()*255))<<7;
	this.reg_s16[7] = 0x0002;
//	this.reg_s16[2] = 0xff00;
	this.execDoubleOp(0xA144&0xffff); // MOVB R2 -> R3

	return CPU.prototype.execCode;

	/* if we reached down here, then opcode was not understood, therefore reserved code trap */
	this.vector = this.vectors.TRAP_RESERVED_OPCODE;
	return CPU.prototype.execVector;
};

CPU.prototype.halt = function() {
	/* this is what we'll get if we get 2 Bus Errors in a row*/
	return CPU.prototype.halt;
};

CPU.prototype.step = function() {
	this.nextFun = this.nextFun();
};
