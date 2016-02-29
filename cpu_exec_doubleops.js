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
			var src = this.addressingIP((code>>6)&0x3f, isByte);
			var dst = this.addressingIP(code&0x3f, isByte);
			
			console.log(isByte);
			
			sp = isByte?this.sp_u8:this.sp_u16;

			sp[0] = src.ru();
			sp[1] = dst.ru();
			sp[2] = sp[0] - sp[1];

			
			/* I had two different PDP emulators, hundred and one Undertale soundtracks playing, 
			 * five Wiki pages open, a mug half-full of tea, and a whole galaxy bitwise ANDs, ORs,
			 * NOTs, XORs...
			 * ...and also a real MK85, MDN javascript docs, a case of Wine, and two dozen
			 * kilobytes of plain-text PDP manuals.
			 * Not that I needed all that for the trip, but once you get locked into a serious
			 * drug collection, the tendency is to push it as far as you can.
			 */

			/* note to myself: simulate ~ as ^0xffff - JS bitwise XOR messes things up, grrrr */
			
			sp[3] = ((sp[2]&sp[1])|((0xffff^sp[0])&(sp[2]|sp[1])))>>(isByte?0:8);
			
			this.psw &= ~(this.flags.V|this.flags.C);
			this.psw |= (((sp[3]&0x80)!=0)?this.flags.C:0);
			this.psw |= (((sp[3]^(sp[3]<<1))&0x80)!=0)?this.flags.V:0;
		
			this.checkBitNZ((isByte?this.sp_s8:this.sp_s16)[2]);
			
			break;
		}
		case 3:	/* BIT[B] */
		{
			
		}
		case 4: /* BIC[B] */
		case 5:	/* BIS[B] */
		case 6: /* ADD/SUB */
	}
	
};
