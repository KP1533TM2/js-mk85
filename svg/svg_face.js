function MK85_SVG_FACE(root) {
	this.root = root;
	// nothing fancy, just create a rectangle now
	this.svgNS = "http://www.w3.org/2000/svg";
	
	this.key1 = 0;
	this.key2 = 0;
	this.keysPressed = 0;
	this.keyList = [];
	this.hasFocus = false;
	
	var svgNS = this.svgNS;
	var face  = document.createElementNS(svgNS,"svg");
	face.setAttributeNS(null,"width",  500);
	face.setAttributeNS(null,"height", 250);
	face.setAttributeNS(null,"style", "background-color:gray");
	
	this.face = face;

	this.kbdCols = 0;
	
	// create SVG LCD
	
	this.lcd = MK85_SVG_LCD();
//	lcd.timerCallback = frameCallback;
	face.appendChild(this.lcd.svg);
}

MK85_SVG_FACE.prototype.kbthing = {
	0x51: 7,	// Q
	0x57: 8,	// W
	0x45: 9,	// E
	0x52: 10,	// R
	0x54: 11,	// T
	0x59: 12,	// Y
	0x55: 13,	// U
	0x49: 14,	// I
	0x4f: 15,	// O
	0x50: 16,	// P
	
	0x41: 17,	// A
	0x53: 18,	// S
	0x44: 19,	// D
	0x46: 20,	// F
	0x47: 21,	// G
	0x48: 22,	// H
	0x4a: 23,	// J
	0x4b: 24,	// K
	0x4c: 25,	// L
	0x10: 26,	// ANS
	
	0x5a: 27,	// Z
	0x58: 28,	// X
	0x43: 29,	// C
	0x56: 30,	// V
	0x42: 31,	// B
	0x4e: 32,	// N
	0x4d: 33,	// M
	0x20: 34,	// space
	0xbb: 35,	// =
	0x11: 36,	// EE

	0x1b: 37,			// AC
	0x2e: 38,			// DEL
	0x13: 39,			// STOP
	0xbf: 40, 0x6f: 40,	// /

	0x31: 49,	// 1
	0x32: 50,	// 2
	0x33: 51,	// 3
	0x34: 45,	// 4
	0x35: 46,	// 5
	0x36: 47,	// 6
	0x37: 41,	// 7
	0x38: 42,	// 8
	0x39: 43,	// 9
	0x30: 53,	// 0
	
	0x6b: 52,	// +
	0x6d: 48,	// -
	0x6a: 44,	// *
	
	0x0d: 55,	// EXE
	0x6e: 54, 0xbe:54, // .

	0x2d: 2,	// MODE
	0x25: 3,	// <--
	0x27: 4,	// -->
	0x24: 5,	// [s]
	0x23: 6,	// [f]

	
	0x21: 56	// INIT
	
};

MK85_SVG_FACE.prototype.keyUpHandler = function(evt) {
	while((this.hasFocus)&&(this.keyList.indexOf(evt.keyCode)!=-1)) {
		this.keyList.splice(this.keyList.indexOf(evt.keyCode), 1);
	};
	console.log(this.keyList);
};

MK85_SVG_FACE.prototype.keyDownHandler = function(evt) {
	if(evt.which == 8) evt.preventDefault();
	if((this.hasFocus)&&(this.keyList.length<2)) {
		if((evt.keyCode in this.kbthing)&&(this.keyList.indexOf(evt.keyCode)==-1))
			this.keyList.push(evt.keyCode);
			console.log(this.keyList, ", keyCode(hex):", evt.keyCode.toString(16));
	}
};

MK85_SVG_FACE.prototype.initialize = function() {
	this.root.appendChild(this.face);
	
	// add event listener for keyboard
	var self = this;
	this.face.addEventListener('mouseenter', function(evt) {self.hasFocus = true  },false);
	this.face.addEventListener('mouseleave', function(evt) {self.hasFocus = false },false);

	document.documentElement.addEventListener('keydown',this.keyDownHandler.bind(this),false);
	document.documentElement.addEventListener('keyup',this.keyUpHandler.bind(this),false);
//	this.root.addEventListener('keydown',this.keyDownHandler,false);
	
};

MK85_SVG_FACE.prototype.keyRead = function(rows) {
	var lastElem = this.keyList[this.keyList.length-1];
	var k = ((typeof lastElem != 'undefined')&&(lastElem in this.kbthing))?this.kbthing[lastElem]:0;

	var ktables = this.keyTables;
	var cols = ((rows&2)?ktables[0][k]:0)|((rows&4)?ktables[1][k]:0)|((rows&8)?ktables[2][k]:0);
	return cols;
};
