var keysPressed = [];

MK85_SVG_FACE.prototype.faceKeys = {

	mode:{type:0, posCode:0x05, lblAbove:"MODE", lblAboveColor:'black'},
	arrow_l:{type:0, posCode:0x06, lblOn:"←"},
	arrow_r:{type:0, posCode:0x07, lblOn:"→"},
	mod_s:{type:0, posCode:0x08, lblOn:"S", lblOnColor:'red'},
	mod_f:{type:0, posCode:0x09, lblOn:"F", lblOnColor:'blue'},


	q:{type:0, posCode:0x10, lblRight:"Я", lblOn:"Q", lblAbove:"!",  lblBelow:"SET"},
	w:{type:0, posCode:0x11, lblRight:"В", lblOn:"W", lblAbove:"\"", lblBelow:"MODE"},
	e:{type:0, posCode:0x12, lblRight:"Е", lblOn:"E", lblAbove:"#",  lblBelow:"VAL"},
	r:{type:0, posCode:0x13, lblRight:"Р", lblOn:"R", lblAbove:"$",  lblBelow:"MID"},
	t:{type:0, posCode:0x14, lblRight:"Т", lblOn:"T", lblAbove:"(",  lblBelow:"LEN"},
	y:{type:0, posCode:0x15, lblRight:"Ы", lblOn:"Y", lblAbove:")",  lblBelow:"KEY"},
	u:{type:0, posCode:0x16, lblRight:"У", lblOn:"U", lblAbove:"?",  lblBelow:"CLEAR"},
	i:{type:0, posCode:0x17, lblRight:"И", lblOn:"I", lblAbove:":",  lblBelow:"VAC"},
	o:{type:0, posCode:0x18, lblRight:"О", lblOn:"O", lblAbove:";",  lblBelow:"RND("},
	p:{type:0, posCode:0x19, lblRight:"П", lblOn:"P", lblAbove:",",  lblBelow:"AUTO"},

	a:{type:0, posCode:0x20, lblRight:"А", lblOn:"A", lblAbove:"GOSUB",  lblBelow:"SIN"},
	s:{type:0, posCode:0x21, lblRight:"С", lblOn:"S", lblAbove:"FOR", lblBelow:"COS"},
	d:{type:0, posCode:0x22, lblRight:"Д", lblOn:"D", lblAbove:"TO",  lblBelow:"TAN"},
	f:{type:0, posCode:0x23, lblRight:"Ф", lblOn:"F", lblAbove:"STEP",  lblBelow:"ASN"},
	g:{type:0, posCode:0x24, lblRight:"Г", lblOn:"G", lblAbove:"NEXT",  lblBelow:"ACS"},
	h:{type:0, posCode:0x25, lblRight:"Х", lblOn:"H", lblAbove:"GOTO",  lblBelow:"ATN"},
	j:{type:0, posCode:0x26, lblRight:"Й", lblOn:"J", lblAbove:"IF",  lblBelow:"LOG"},
	k:{type:0, posCode:0x27, lblRight:"К", lblOn:"K", lblAbove:"THEN",  lblBelow:"LN"},
	l:{type:0, posCode:0x28, lblRight:"Л", lblOn:"L", lblAbove:"PRINT",  lblBelow:"EXP"},
	ans:{type:0, posCode:0x29, lblOn:"ANS", lblAbove:"DRAWC",  lblBelow:"DRAW"},

	z:{type:0, posCode:0x30, lblRight:"З", lblOn:"Z", lblAbove:"RETURN",  lblBelow:"SQR"},
	x:{type:0, posCode:0x31, lblRight:"Ь", lblOn:"X", lblAbove:"STOP", lblBelow:"ABS"},
	c:{type:0, posCode:0x32, lblRight:"Ц", lblOn:"C", lblAbove:"END",  lblBelow:"SGN"},
	v:{type:0, posCode:0x33, lblRight:"Ж", lblOn:"V", lblAbove:"DEFM",  lblBelow:"INT"},
	b:{type:0, posCode:0x34, lblRight:"Б", lblOn:"B", lblAbove:"RUN",  lblBelow:"FRAC"},
	n:{type:0, posCode:0x35, lblRight:"Н", lblOn:"N", lblAbove:"LIST",  lblBelow:"RAN#"},
	m:{type:0, posCode:0x36, lblRight:"М", lblOn:"M", lblAbove:"INPUT",  lblBelow:"CSR"},
	spc:{type:0, posCode:0x37, lblRight:"Ъ", lblOn:"SPC", lblAbove:"LETC",  lblBelow:"GETC"},
	eq:{type:0, posCode:0x38, lblRight:"Э", lblOn:"=", lblAbove:"≠",  lblBelow:"ASCI"},
	ee:{type:0, posCode:0x39, lblRight:"Ю", lblOn:"EE", lblAbove:"π",  lblBelow:"CHR"},
	
	ac  :{type:1, posCode:0x00, lblOn:"AC", btnColor:"red"},
	del :{type:1, posCode:0x01, lblOn:"DEL", lblAbove:"INS", btnColor:"red"},
	stop:{type:1, posCode:0x02, lblAbove:"STOP", lblAboveColor:"black"},
	div :{type:1, posCode:0x03, lblOn:"/", lblAbove:"<", lblRight:"Ё"},
	mul :{type:1, posCode:0x13, lblOn:"*", lblAbove:">", lblRight:"Ч"},
	sub :{type:1, posCode:0x23, lblOn:"-", lblAbove:"≤", lblRight:"Ш"},
	add :{type:1, posCode:0x33, lblOn:"+", lblAbove:"≥", lblRight:"Щ"},
	dot :{type:1, posCode:0x41, lblOn:".", lblAbove:"↑"},
	exe :{type:1, posCode:0x42, lblOn:"EXE", doubleWidth:true},
	n0  :{type:1, posCode:0x40, lblOn:"0", lblAbove:"P0"},
	n1  :{type:1, posCode:0x30, lblOn:"1", lblAbove:"P1"},
	n2  :{type:1, posCode:0x31, lblOn:"2", lblAbove:"P2"},
	n3  :{type:1, posCode:0x32, lblOn:"3", lblAbove:"P3"},
	n4  :{type:1, posCode:0x20, lblOn:"4", lblAbove:"P4"},
	n5  :{type:1, posCode:0x21, lblOn:"5", lblAbove:"P5"},
	n6  :{type:1, posCode:0x22, lblOn:"6", lblAbove:"P6"},
	n7  :{type:1, posCode:0x10, lblOn:"7", lblAbove:"P7"},
	n8  :{type:1, posCode:0x11, lblOn:"8", lblAbove:"P8"},
	n9  :{type:1, posCode:0x12, lblOn:"9", lblAbove:"P9"},

};

MK85_SVG_FACE.prototype.blockTypes = [
	{off_x:50, mul_x:40, off_y:100, mul_y:33},
	{off_x:450, mul_x:40, off_y: 100-60, mul_y:39}
];

MK85_SVG_FACE.prototype.svgNS = "http://www.w3.org/2000/svg";

MK85_SVG_FACE.prototype.createText = function(color, size, x, y, text) {
	var txt = document.createElementNS(svgNS, "text");
	txt.setAttributeNS(null,"x", x);
	txt.setAttributeNS(null,"y", y);
	txt.setAttributeNS(null,"fill", color);
	txt.setAttributeNS(null,"font-family","Arial");
	txt.setAttributeNS(null,"text-anchor","middle");
	txt.setAttributeNS(null,"font-size",size);
	var txtNode = document.createTextNode(text);
	txt.setAttribute("unselectable", "on");
	txt.setAttribute("class", "unselectable");
	txt.appendChild(txtNode);
	return txt;
}

MK85_SVG_FACE.prototype.createButtonsOn = function(svg) {
	for(var keyKey in this.faceKeys) {
		var key = this.faceKeys[keyKey];	// no pun intended =)

		var g = document.createElementNS(svgNS, "g");
		g.setAttributeNS(null,"cursor","pointer");
		g.setAttributeNS(null,"id", keyKey);
		g.setAttributeNS(null,"class", "mk85btn");

		switch(key.type) {
			case 0: // small white thing with labels above
			{
				var rect = document.createElementNS(svgNS, "rect");
				var blockType = this.blockTypes[key.type];
				
				var x = blockType.off_x+blockType.mul_x*(key.posCode&0xf);
				var y = blockType.off_y+blockType.mul_y*((key.posCode>>4)&0xf);
				
				rect.setAttributeNS(null,"x",x);
				rect.setAttributeNS(null,"y",y);
				rect.setAttributeNS(null,"width",  25);
				rect.setAttributeNS(null,"height", 15);
				rect.setAttributeNS(null,"fill", "white");
				rect.setAttributeNS(null,"stroke", "black");
				svg.appendChild(rect);
				var txt = document.createElementNS(svgNS, "text");
				
				var colorOn = (typeof key.lblOnColor != 'undefined')?key.lblOnColor:"black";
				var colorAbove = (typeof key.lblAboveColor != 'undefined')?key.lblAboveColor:"red";

				g.appendChild(rect);
				
				if(typeof key.lblOn != 'undefined')
					g.appendChild(this.createText(colorOn,11, x+25/2, y+12, key.lblOn));
				if(typeof key.lblBelow != 'undefined')
					svg.appendChild(this.createText("blue",7, x+25/2, y+23, key.lblBelow));
				if(typeof key.lblAbove != 'undefined')
					svg.appendChild(this.createText(colorAbove,7, x+25/2, y-3, key.lblAbove));
				if(typeof key.lblRight != 'undefined')
					svg.appendChild(this.createText("black",7, x+30, y+10, key.lblRight)); 
				
				break;
			}
			case 1:		// numpad buttons
			{
				var rect = document.createElementNS(svgNS, "rect");
				var blockType = this.blockTypes[key.type];
				
				var x = blockType.off_x+blockType.mul_x*(key.posCode&0xf);
				var y = blockType.off_y+blockType.mul_y*((key.posCode>>4)&0xf);
				
				var width = 25;
				if(typeof key.doubleWidth != 'undefined')
					width += blockType.mul_x;
				
				var color = 'gray';
				if(typeof key.btnColor != 'undefined')
					color = key.btnColor;
				
				rect.setAttributeNS(null,"x",x);
				rect.setAttributeNS(null,"y",y);
				rect.setAttributeNS(null,"width",  width);
				rect.setAttributeNS(null,"height", 18);
				rect.setAttributeNS(null,"fill", color);
				rect.setAttributeNS(null,"stroke", "black");
				rect.setAttributeNS(null,"id", keyKey);
				svg.appendChild(rect);
				var txt = document.createElementNS(svgNS, "text");
				
				var colorOn = "white";
				var colorAbove = (typeof key.lblAboveColor != 'undefined')?key.lblAboveColor:"red";

				g.appendChild(rect);
				
				if(typeof key.lblOn != 'undefined')
					g.appendChild(this.createText(colorOn,11, x+width/2, y+12, key.lblOn));
				if(typeof key.lblBelow != 'undefined')
					svg.appendChild(this.createText("blue",7, x+25/2, y+23, key.lblBelow));
				if(typeof key.lblAbove != 'undefined')
					svg.appendChild(this.createText(colorAbove,7, x+25/2, y-3, key.lblAbove));
				if(typeof key.lblRight != 'undefined')
					svg.appendChild(this.createText("black",7, x+30, y+10, key.lblRight)); 
				
				break;
			}
			default:
			{
				console.log("unsupported type");
				break;
			}
		}
		
		this.handleEvent = function(evt) {
			console.log(evt);
		};
		
		// bind functions
		g.setAttributeNS(null,"onmouseup","MK85_SVG_FACE.prototype.keyRelease(event)");
		g.setAttributeNS(null,"onmouseout","MK85_SVG_FACE.prototype.keyRelease(event)");
		g.setAttributeNS(null,"onmousedown","MK85_SVG_FACE.prototype.keyPress(event)");
		
/*		g.addEventListener("onmouseup", this.handleEvent, true);
		g.addEventListener("onmouseup", this.handleEvent, true);
*/		
		svg.appendChild(g);
	}
}

MK85_SVG_FACE.prototype.keyPress = function(evt) {
	var target = evt.currentTarget;
//	document.getElementById("debug").innerHTML="--->"+target.id;
	console.log("--->", target.id);
}

MK85_SVG_FACE.prototype.keyRelease = function(evt) {
	var target = evt.currentTarget;
//	document.getElementById("debug").innerHTML="<---"+target.id;	
	console.log("<---", target.id);
}

