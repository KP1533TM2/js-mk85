CPU.prototype.decoder = function(code) {
};

CPU.prototype.makeDC0 = function(code) {
	return [
		this.makeDC1,
		this.execBranch,
		this.execBranch,
		this.execBranch,
		this.execBranch,
		this.execBranch,
		this.execBranch,
		this.execBranch,
		this.execJSR,
		this.execJSR,
		this.execSingleOp,
		this.execSingleOp,
		this.execSingleOp,
		this.makeDC5,
		this.execTRAP10,
		this.execTRAP10,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.exec_MUL,
		this.exec_MUL,
		this.exec_DIV,
		this.exec_DIV,
		this.exec_ASH,
		this.exec_ASH,
		this.exec_ASHC,
		this.exec_ASHC,
		this.exec_XOR,
		this.exec_XOR,
		this.exec_FIS,
		this.execTRAP10,
		this.execTRAP10,
		this.execTRAP10,
		this.exec_SOB,
		this.exec_SOB,
		this.execBranch,
		this.execBranch,
		this.execBranch,
		this.execBranch,
		this.execBranch,
		this.execBranch,
		this.execBranch,
		this.execBranch,
		this.execEMT,
		this.execTRAP,
		this.execSingleOp, /* this.makeDC6, */
		this.execSingleOp, /* this.makeDC7, */
		this.execSingleOp, /* this.makeDC8, */
		this.makeDC9,
		this.execTRAP10,
		this.execTRAP10,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execDoubleOp,
		this.execTRAP10,
		this.execTRAP10,
		this.execTRAP10,
		this.execTRAP10,
		this.execTRAP10,
		this.execTRAP10,
		this.execTRAP10,
		this.execTRAP10,
		this.execTRAP10,
		this.execTRAP10,
		this.execTRAP10,
		this.execTRAP10,
		this.execTRAP10,
		this.execTRAP10,
		this.execTRAP10,
		this.execTRAP10
	][(code>>8)&0xff].bind(this)(code);
};

CPU.prototype.makeDC1 = function(code) {
	return [
		this.exec_HALT,
		this.exec_WAIT,
		this.exec_RTI,
		this.exec_BPT,
		this.exec_IOT,
		this.exec_RESET,
		this.exec_RTT,
		this.execTRAP10,
		this.exec_GO,
		this.exec_GO,
		this.exec_GO,
		this.exec_GO,
		this.exec_STEP,
		this.exec_STEP,
		this.exec_STEP,
		this.exec_STEP,
		this.exec_RSEL,
		this.exec_MFUS,
		this.exec_RCPC,
		this.exec_RCPC,
		this.exec_RCPS,
		this.exec_RCPS,
		this.exec_RCPS,
		this.exec_RCPS,
		this.exec_RSEL,
		this.exec_MTUS,
		this.exec_WCPC,
		this.exec_WCPC,
		this.exec_WCPS,
		this.exec_WCPS,
		this.exec_WCPS,
		this.exec_WCPS,
		this.execTRAP10,
		this.execTRAP10,
		this.execTRAP10,
		this.execTRAP10,
		this.execTRAP10,
		this.execTRAP10,
		this.execTRAP10,
		this.execTRAP10,
		this.execTRAP10,
		this.execTRAP10,
		this.execTRAP10,
		this.execTRAP10,
		this.execTRAP10,
		this.execTRAP10,
		this.execTRAP10,
		this.execTRAP10,
		this.execTRAP10,
		this.execTRAP10,
		this.execTRAP10,
		this.execTRAP10,
		this.execTRAP10,
		this.execTRAP10,
		this.execTRAP10,
		this.execTRAP10,
		this.execTRAP10,
		this.execTRAP10,
		this.execTRAP10,
		this.execTRAP10,
		this.execTRAP10,
		this.execTRAP10,
		this.execTRAP10,
		this.execTRAP10,
		this.execJMP,
		this.execJMP,
		this.execJMP,
		this.execJMP,
		this.execJMP,
		this.execJMP,
		this.execJMP,
		this.execJMP,
		this.execJMP,
		this.execJMP,
		this.execJMP,
		this.execJMP,
		this.execJMP,
		this.execJMP,
		this.execJMP,
		this.execJMP,
		this.execJMP,
		this.execJMP,
		this.execJMP,
		this.execJMP,
		this.execJMP,
		this.execJMP,
		this.execJMP,
		this.execJMP,
		this.execJMP,
		this.execJMP,
		this.execJMP,
		this.execJMP,
		this.execJMP,
		this.execJMP,
		this.execJMP,
		this.execJMP,
		this.execJMP,
		this.execJMP,
		this.execJMP,
		this.execJMP,
		this.execJMP,
		this.execJMP,
		this.execJMP,
		this.execJMP,
		this.execJMP,
		this.execJMP,
		this.execJMP,
		this.execJMP,
		this.execJMP,
		this.execJMP,
		this.execJMP,
		this.execJMP,
		this.execJMP,
		this.execJMP,
		this.execJMP,
		this.execJMP,
		this.execJMP,
		this.execJMP,
		this.execJMP,
		this.execJMP,
		this.execJMP,
		this.execJMP,
		this.execJMP,
		this.execJMP,
		this.execJMP,
		this.execJMP,
		this.execJMP,
		this.execJMP,
		this.execRTS,
		this.execRTS,
		this.execRTS,
		this.execRTS,
		this.execRTS,
		this.execRTS,
		this.execRTS,
		this.execRTS,
		this.execTRAP10,
		this.execTRAP10,
		this.execTRAP10,
		this.execTRAP10,
		this.execTRAP10,
		this.execTRAP10,
		this.execTRAP10,
		this.execTRAP10,
		this.execTRAP10,
		this.execTRAP10,
		this.execTRAP10,
		this.execTRAP10,
		this.execTRAP10,
		this.execTRAP10,
		this.execTRAP10,
		this.execTRAP10,
		this.execTRAP10,
		this.execTRAP10,
		this.execTRAP10,
		this.execTRAP10,
		this.execTRAP10,
		this.execTRAP10,
		this.execTRAP10,
		this.execTRAP10,
		this.exec_CLC,
		this.exec_CLC,
		this.exec_CLC,
		this.exec_CLC,
		this.exec_CLC,
		this.exec_CLC,
		this.exec_CLC,
		this.exec_CLC,
		this.exec_CLC,
		this.exec_CLC,
		this.exec_CLC,
		this.exec_CLC,
		this.exec_CLC,
		this.exec_CLC,
		this.exec_CLC,
		this.exec_CLC,
		this.exec_SEC,
		this.exec_SEC,
		this.exec_SEC,
		this.exec_SEC,
		this.exec_SEC,
		this.exec_SEC,
		this.exec_SEC,
		this.exec_SEC,
		this.exec_SEC,
		this.exec_SEC,
		this.exec_SEC,
		this.exec_SEC,
		this.exec_SEC,
		this.exec_SEC,
		this.exec_SEC,
		this.exec_SEC,
		this.execSWAB,
		this.execSWAB,
		this.execSWAB,
		this.execSWAB,
		this.execSWAB,
		this.execSWAB,
		this.execSWAB,
		this.execSWAB,
		this.execSWAB,
		this.execSWAB,
		this.execSWAB,
		this.execSWAB,
		this.execSWAB,
		this.execSWAB,
		this.execSWAB,
		this.execSWAB,
		this.execSWAB,
		this.execSWAB,
		this.execSWAB,
		this.execSWAB,
		this.execSWAB,
		this.execSWAB,
		this.execSWAB,
		this.execSWAB,
		this.execSWAB,
		this.execSWAB,
		this.execSWAB,
		this.execSWAB,
		this.execSWAB,
		this.execSWAB,
		this.execSWAB,
		this.execSWAB,
		this.execSWAB,
		this.execSWAB,
		this.execSWAB,
		this.execSWAB,
		this.execSWAB,
		this.execSWAB,
		this.execSWAB,
		this.execSWAB,
		this.execSWAB,
		this.execSWAB,
		this.execSWAB,
		this.execSWAB,
		this.execSWAB,
		this.execSWAB,
		this.execSWAB,
		this.execSWAB,
		this.execSWAB,
		this.execSWAB,
		this.execSWAB,
		this.execSWAB,
		this.execSWAB,
		this.execSWAB,
		this.execSWAB,
		this.execSWAB,
		this.execSWAB,
		this.execSWAB,
		this.execSWAB,
		this.execSWAB,
		this.execSWAB,
		this.execSWAB,
		this.execSWAB,
		this.execSWAB
	][code&0xff].bind(this)(code);
};

CPU.prototype.makeDC5 = function(code) {
	return [this.execMARK, this.execTRAP10, this.execTRAP10, this.execSXT][(code>>6)&3].bind(this)(code);
};

CPU.prototype.makeDC9 = function(code) {
	return [this.execMTPS, this.execTRAP10, this.execTRAP10, this.execMFPS][(code>>6)&3].bind(this)(code);
};



