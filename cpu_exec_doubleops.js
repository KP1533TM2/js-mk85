
CPU.prototype.execDoubleOp = function(code) {
	var opcode = (code>>12)&0x7;
	var isByte = ((code&0x8000)==0x8000)&&(opcode<6);
	
	/* get 2 operands */
	
	switch(opcode) {
		case 1:	/* MOV[B] */
		{
			var src = this.addressingIP((code>>6)&0x3f, isByte);
			
			/* if destination is a register, then sign-extend it */
			var dst = this.addressingIP(code&0x3f, ((code&0x38)==0)?false:isByte);
	
			/* read signed */
			var x = src.rs();
			console.log(x);
			/* and write it to destination */
			dst.w(x);
			this.psw &= ~this.flags.V;
			this.checkBitNZ(x);
			break;
		}
		case 2: /* CMP[B] */
		{
			var dst = this.addressingIP((code>>6)&0x3f, isByte);
			var src = this.addressingIP(code&0x3f, isByte);
			var x = dst.ru() - src.ru();
			var y = (x & src.ru())|((~src.ru()) & (x|src.ru()));
			this.psw &= ~(this.flags.N|this.flags.Z|this.flags.V|this.flags.C);
			
			if((y&0x8000)!=0) this.psw |= this.flags.C;
			y &= 0xc000;
			
			if ((y==0x8000)||(y==0x4000)) this.psw |= this.flags.V;
			
			this.checkBitNZ(x);
			
			if(isByte) {
			} else {

			}
		}
		case 3:	/* BIT[B] */
		case 4: /* BIC[B] */
		case 5:	/* BIS[B] */
		case 6: /* ADD/SUB */
	}
	
};
