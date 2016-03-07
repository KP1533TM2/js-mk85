function MK85Display(name)
{
	this.emptyLcdString = '';
	this.div = null;
	this.segments = [
		/* special segments according to http://www.pisi.com.pl/piotr433/mk85hwe.htm#lcdc */
		{row:3, col:1,  bit:0,   text:"E X T"},
		{row:2, col:8,  bit:1,   text:"S"},
		{row:3, col:8,  bit:2,   text:"F"},
		{row:2, col:11, bit:64,  text:"R U N"},
		{row:3, col:11, bit:65,  text:"W R T"},
		{row:3, col:19, bit:68,  text:"D E G"},
		{row:3, col:27, bit:192, text:"R A D"},
		{row:3, col:35, bit:256, text:"G R A"},
		{row:3, col:43, bit:320, text:"T R"},
		// 7-segment 1
		{row:2, col:51, bit:385, text:"_"},		// g
		{row:2, col:50, bit:384, text:"/"},		// f
		{row:3, col:49, bit:386, text:"/"},		// e
		{row:3, col:50, bit:387, text:"_"},		// d
		{row:3, col:51, bit:388, text:"/"},		// c
		{row:2, col:52, bit:448, text:"/"},		// b
		{row:1, col:51, bit:449, text:"__"},	// a
		// 7-segment 2
		{row:2, col:58, bit:451, text:"_"},		// g
		{row:2, col:57, bit:450, text:"/"},		// f
		{row:3, col:56, bit:452, text:"/"},		// e
		{row:3, col:57, bit:512, text:"_"},		// d
		{row:3, col:58, bit:513, text:"/"},		// c
		{row:2, col:59, bit:514, text:"/"},		// b
		{row:1, col:58, bit:515, text:"__"},	// a
		// 7-segment 3
		{row:2, col:65, bit:576, text:"_"},		// g
		{row:2, col:64, bit:516, text:"/"},		// f
		{row:3, col:63, bit:577, text:"/"},		// e
		{row:3, col:64, bit:578, text:"_"},		// d
		{row:3, col:65, bit:579, text:"/"},		// c
		{row:2, col:66, bit:580, text:"/"},		// b
		{row:1, col:65, bit:640, text:"__"},	// a
		// 7-segment 4
		{row:2, col:72, bit:642, text:"_"},		// g
		{row:2, col:71, bit:641, text:"/"},		// f
		{row:3, col:70, bit:643, text:"/"},		// e
		{row:3, col:71, bit:644, text:"_"},		// d
		{row:3, col:72, bit:704, text:"/"},		// c
		{row:2, col:73, bit:705, text:"/"},		// b
		{row:1, col:72, bit:706, text:"__"},	// a

		{row:3, col:76, bit:707, text:"S T O P"}
	];

};

MK85Display.prototype.initialize = function() {
	var body = document.body,
	div = document.createElement('div');
	div.style.border = '1px solid black';
	div.style.fontFamily = 'monospace';
	this.div = div;
	//body.appendChild(div);
	s = ''
	for(var i = 0; i < 4; i++) {
		for(var j = 0; j < 82; j++) {
			s += ' ';
		}
		s += '\n';
	}
	this.emptyLcdString = s;
	return div;
};

MK85Display.prototype.redraw = function (video96Bytes) {
	var textField = this.emptyLcdString;
	var charField = '';
	segLen = this.segments.length;
	for (var i = 0; i < segLen; i++)
	{
		seg = this.segments[i];
		/* Вычисляем байт/бит */
		var byteIndex = seg.bit>>3;
		var bitMask   = (1<<(seg.bit&7));
		var bit       = video96Bytes[byteIndex] & bitMask;
		if(bit)
		{
			textField = textField.substring(0, (seg.row-1)*(82+1)+(seg.col-1)) +
			            seg.text + 
			            textField.substring((seg.row-1)*(82+1)+(seg.col-1)+seg.text.length, textField.length);
		}
		//console.log(byteIndex, bitMask, ram[byteIndex], bit);
	}
	for (var lineOffset = 0; lineOffset < 7; lineOffset++) {
		for (var charOffset = 1; charOffset != 89+8; charOffset+=8) {
			var byteValue = video96Bytes[charOffset+lineOffset];
			for (var bit = 0; bit < 5; bit++) {
//				charField += (byteValue&1) ? 'Ж' : '.';
				charField += (byteValue&1) ? 'O' : '.';
//				charField += (byteValue&1) ? '█' : '░';
				byteValue>>=1;
			}
			charField += '  ';
		}
		charField += '\n';
	}
	this.div.innerHTML = '<pre>'+textField+charField+'</pre>';
}


