
// pretty self-explanatory, I think =)

var textSegs = [
	{addr:0x00, bit:0, txt:"EXT",  x:16, y:17+5},
	{addr:0x00, bit:1, txt:"S",    x:34, y:12+5},
	{addr:0x00, bit:2, txt:"F",    x:34, y:22+5},
	{addr:0x08, bit:0, txt:"RUN",  x:58, y:12+5},
	{addr:0x08, bit:1, txt:"WRT",  x:58, y:22+5},
	{addr:0x08, bit:4, txt:"DEG",  x:4*7*3-4+6, y:17+5},
	{addr:0x18, bit:0, txt:"RAD",  x:4*7*4+0+6, y:17+5},
	{addr:0x20, bit:0, txt:"GRA",  x:4*7*5+4+6, y:17+5},
	{addr:0x28, bit:0, txt:"TR",  x:4*7*6+6+10, y:17+5},
	{addr:0x58, bit:3, txt:"STOP",  x:4*7*11+6+5, y:17+5},
];

var sevenSegsMapping = [
	{
		a:{addr:0x38, bit:1},
		b:{addr:0x38, bit:0},
		c:{addr:0x30, bit:4},
		d:{addr:0x30, bit:3},
		e:{addr:0x30, bit:2},
		f:{addr:0x30, bit:0},
		g:{addr:0x30, bit:1}
	},{
		a:{addr:0x40, bit:3},
		b:{addr:0x40, bit:2},
		c:{addr:0x40, bit:1},
		d:{addr:0x40, bit:0},
		e:{addr:0x38, bit:4},
		f:{addr:0x38, bit:2},
		g:{addr:0x38, bit:3}
	},{
		a:{addr:0x50, bit:0},
		b:{addr:0x48, bit:4},
		c:{addr:0x48, bit:3},
		d:{addr:0x48, bit:2},
		e:{addr:0x48, bit:1},
		f:{addr:0x40, bit:4},
		g:{addr:0x48, bit:0}
	},{
		a:{addr:0x58, bit:2},
		b:{addr:0x58, bit:1},
		c:{addr:0x58, bit:0},
		d:{addr:0x50, bit:4},
		e:{addr:0x50, bit:3},
		f:{addr:0x50, bit:1},
		g:{addr:0x50, bit:2}
	}
];

var cursorShapes = {
	underscore:{or:[0,0,0,0,0,0,31], and:[0,0,0,0,0,0,31]},
	block:{or:[31,31,31,31,31,31,31], and:[31,31,31,31,31,31,31]},
	none:{or:[0,0,0,0,0,0,0], and:[31,31,31,31,31,31,31]}
};
