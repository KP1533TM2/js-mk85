function uniqueFromTwoArrays(arr1, arr2) {
	var output = [];
	for(var x = 0; x < arr1.length; x++)
		if(output.indexOf(arr1[x]==-1)) output.push(arr1[x]);

	for(var x = 0; x < arr2.length; x++)
		if(output.indexOf(arr2[x]==-1)) output.push(arr2[x]);

	return output;
}

function keysRead(rows) {
	// rows a.k.a. CPU parallel port output
	
	var lastElem = uniquesPressed[uniquesPressed.length-1];
	
	var k = ((typeof lastElem != 'undefined')&&(lastElem in keyTable))?keyTable[lastElem]:"nokey";

	var cols = ((rows&2)?k[0]:0)|((rows&4)?k[1]:0)|((rows&8)?k[2]:0);
	if((rows&2)&&(lastElem=="stop")) 
	{
		MK85CPU.flag_halt = true;
		console.log("HALT");
	}
	
	return cols;
}

var keyboardMapping = {
	q:0x51,
	w:0x57,
	e:0x45,
	r:0x52,
	t:0x54,
	y:0x59,
	u:0x55,
	i:0x49,
	o:0x4f,
	p:0x50,
	
	a:0x41,
	s:0x53,
	d:0x44,
	f:0x46,
	g:0x47,
	h:0x48,
	j:0x4a,
	k:0x4b,
	l:0x4c,
	ans:0x10,
	
	z:0x5a,
	x:0x58,
	c:0x43,
	v:0x56,
	b:0x42,
	n:0x4e,
	m:0x4d,
	spc:0x20,
	eq:0xbb,
	ee:0x11,

	ac:0x1b,
	del:0x2e,
	stop:0x13,
	div:0xbf,

	n1:0x31,
	n2:0x32,
	n3:0x33,
	n4:0x34,
	n5:0x35,
	n6:0x36,
	n7:0x37,
	n8:0x38,
	n9:0x39,
	n0:0x30,
	
	add:0x6b,
	sub:0x6d,
	mul:0x6a,
	
	exe:0x0d,
	dot:0x6e,

	mode:0x2d,
	arrow_l:0x25,
	arrow_r:0x27,
	mode_s:0x24,
	mode_f:0x23,
	
	init:0x21
	
};

var keyTable = {
	nokey:		[0x0000,0x0000,0x0000],
	powersw:	[0x0000,0x0000,0x0000],

	mode:		[0x0000,0x000C,0x0000],
	arrow_l:	[0x0000,0x0014,0x0000],
	arrow_r:	[0x0000,0x0018,0x0000],
	mode_s:		[0x0000,0x0024,0x0000],
	mode_f:		[0x0000,0x0028,0x0000],
	
	q:			[0x0000,0x0000,0x0044],
	w:			[0x0000,0x0000,0x000c],
	e:			[0x0000,0x0000,0x0018],
	r:			[0x0000,0x0000,0x0090],
	t:			[0x0000,0x0000,0x00a0],
	y:			[0x0000,0x0030,0x0000],
	u:			[0x0000,0x0044,0x0000],
	i:			[0x0000,0x0048,0x0000],
	o:			[0x0000,0x0050,0x0000],
	p:			[0x0000,0x0060,0x0000],

	a:			[0x0000,0x0000,0x0088],
	s:			[0x0000,0x0000,0x0014],
	d:			[0x0000,0x0000,0x0050],
	f:			[0x0000,0x0000,0x0024],
	g:			[0x0000,0x0000,0x0028],
	h:			[0x0000,0x0084,0x0000],
	j:			[0x0000,0x0088,0x0000],
	k:			[0x0000,0x0090,0x0000],
	l:			[0x0000,0x00a0,0x0000],
	ans:		[0x0000,0x00c0,0x0000],
	
	z:			[0x0000,0x0000,0x0030],
	x:			[0x0000,0x0000,0x0048],
	c:			[0x0000,0x0000,0x0084],
	v:			[0x0000,0x0000,0x00c0],
	b:			[0x0000,0x0000,0x0060],
	n:			[0x0000,0x0108,0x0000],
	m:			[0x0000,0x0104,0x0000],
	spc:		[0x0000,0x0110,0x0000],
	eq:			[0x0000,0x0120,0x0000],
	ee:			[0x0000,0x0140,0x0000],
	
	ac:			[0x000c,0x0000,0x0000],
	del:		[0x0014,0x0000,0x0000],
	stop:		[0x0000,0x0000,0x0000],
	div:		[0x0024,0x0000,0x0000],
	n7:			[0x0028,0x0000,0x0000],
	n8:			[0x0030,0x0000,0x0000],
	n9:			[0x0044,0x0000,0x0000],
	mul:		[0x0048,0x0000,0x0000],
	n4:			[0x0050,0x0000,0x0000],
	n5:			[0x0060,0x0000,0x0000],
	n6:			[0x0084,0x0000,0x0000],
	sub:		[0x0088,0x0000,0x0000],
	n1:			[0x0090,0x0000,0x0000],
	n2:			[0x00a0,0x0000,0x0000],
	n3:			[0x00c0,0x0000,0x0000],
	add:		[0x0104,0x0000,0x0000],
	n0:			[0x0108,0x0000,0x0000],
	dot:		[0x0110,0x0000,0x0000],
	exe:		[0x0120,0x0000,0x0000],
	
	init:		[0x0018,0x0000,0x0000]
};



var faceKeys = {

	mode:{type:0, posCode:0x05, lblAbove:"MODE", lblAboveColor:'black'},
	arrow_l:{type:0, posCode:0x06, lblOn:"←"},
	arrow_r:{type:0, posCode:0x07, lblOn:"→"},
	mode_s:{type:0, posCode:0x08, lblOn:"S", lblOnColor:'red'},
	mode_f:{type:0, posCode:0x09, lblOn:"F", lblOnColor:'blue'},

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

var blockTypes = [
	{off_x:50, mul_x:40, off_y:100, mul_y:33},
	{off_x:450, mul_x:40, off_y: 100-60, mul_y:39}
];
