//CPU.prototype.addressing



function adressing(operandVal, instructionPointer, isByte) {
	var regIndex = operandVal&7;
	var addrMode = (operandVal>>3)&7;
	
	var _isReg = ((addrMode&3)==0)?true:false;
	
	var result = {addr:null, isReg:null, isByte:null, nextIP:null};
	
	switch(addrMode) {
		/* register */
		case 0: 
		{
			this.w = new Function
		}
		/* register deferred */
		case 1: 
		/* autoincrement */
		case 2:
		/* autoincrement deferred */
		case 3:
        /* autodecrement */
        case 4:
        /* autodecrement deferred */
        case 5:
        /* index */
        case 6:
        /* index deferred */
        case 7:

	}
}

MK85CPU.prototype.addressMode = function(addrMode,val,isByte) {
    /* warning ! increments IP if mode is 'index deferred' */
    var regIndex = addrMode&7;
    switch((addrMode>>3)&0x07)
    {
        /* register */
        case 0: 
        {
            if(val===null) {
                return this.reg_u16[regIndex];
            } else {
                this.reg_u16[regIndex] = val;
                return null;
            };
        };
        /* register deferred */
        case 1: return this.access(this.reg_u16[regIndex], val, isByte);
        /* autoincrement */
        case 2: 
        {
            var i = this.access(this.reg_u16[regIndex], val, isByte);
            this.reg_u16[regIndex] += isByte?1:2;
            return i;
        };
        /* autoincrement deferred */
        case 3:
        {
            var i = this.access(this.access(this.reg_u16[regIndex], null, false), val, isByte);
            this.reg_u16[regIndex] += 2;
            return i;
        };
        /* autodecrement */
        case 4:
        {
            this.reg_u16[regIndex] -= isByte?1:2;
            return this.access(this.reg_u16[regIndex], val, isByte);
        };
        /* autodecrement deferred */
        case 5:
        {
            this.reg_u16[regIndex] -= 2;
            return this.access(this.access(this.reg_u16[regIndex], null, false), val, isByte);
        };
        /* index */
        case 6:
        {
        	var j = (this.reg_u16[regIndex]+2+this.access(this.reg_u16[7], null, false));
            var i =  this.access(j , val, isByte);
/*            this.ip[0]+=2;
            this.ip[1]+=2;*/
            return i;
        };
        /* index deferred */
        case 7:
        {
            var i = this.access(this.access((this.reg_u16[regIndex]+2+this.access(this.reg_u16[7], null, false)), null, false), val, isByte);
/*            this.ip[0]+=2;
            this.ip[1]+=2;*/
            return i;
        };
    };
};
