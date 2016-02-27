
CPU.prototype.addrReg = function(reg, isByte) {
	/* register addressing */
	var self = this;
	if(isByte) {
		return {
			w: function(val) {
				self.reg_u16[regIndex] = (self.reg_u16[regIndex]&0xFF00)|(0xFF&val);
			},
			r: function() {
				return self.reg_u16[regIndex]&0xFF;
			}
		};
	} else {
		return {
			w: function(val) {
				self.reg_u16[regIndex] = val;
			},
			r: function() {
				return self.reg_u16[regIndex];
			}
		};
	}
};

CPU.prototype.addrMem = function(memAddr, isByte) {
	/* address memory */
	var self = this;
	return {
		w: function(val) {
			//console.log("memAddr", memAddr.toString(16));
			self.access(memAddr, val, isByte);
		},
		r: function() {
			//console.log("memAddr", memAddr.toString(16));
			return self.access(memAddr, null, isByte);
		}
	};
};

CPU.prototype.addressing = function(immediateIP, operand, isByte) {
	var regIndex = operand&7;
	var addrMode = (operand>>3)&7;
	var self = this;
	
	var result = null;
	
	if(addrMode==0) {
		/* if register addressing mode, just get it over with */
		result = this.addrReg(regIndex, isByte);
		result.nextIP = immediateIP;
		return result;
	}

	if((addrMode&6)==4) {
		/* autodecrement */
		this.reg_u16[regIndex] -= ((addrMode&1)==0)?(isByte?1:2):2;
	}

	/* take base value for modes, that is (Ri) */
	var memPtr = self.reg_u16[regIndex];

	if((addrMode&6)==2) {
		/* autoincrement */
		this.reg_u16[regIndex] += ((addrMode&1)==0)?(isByte?1:2):2;
	}
		
	if((addrMode&6)==6) {
		/* index thing */
		/* get value from current immediate IP address, from second or third word that is */
		memPtr=(memPtr+this.access(immediateIP, null, false))&0xFFFF;
		immediateIP=(immediateIP+2)&0xFFFF;
	}
	
	if((addrMode&1)==1) {
		/* if deferred, add another indirection */
		memPtr=this.access(memPtr, null, false);
	}
	
	result=this.addrMem(memPtr, isByte);
	result.nextIP = immediateIP;
	return result;
};
			/* template */
/*			case 1: return {
				w: function(val) {
				},
				r: function() {
				},
				nextIP:immediateIP
			};
*/
