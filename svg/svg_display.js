function MK85_SVG_LCD() {
	this.svgNS = "http://www.w3.org/2000/svg";
	var svg = document.createElementNS(this.svgNS, "svg");
	svg.setAttributeNS(null,"width",  6*2+4*7*12-8);
	svg.setAttributeNS(null,"height", 25+7*8);
//	svg.setAttributeNS(null,"style", "background-color:gainsboro");
	this.svg = svg;

	var r = document.createElementNS(this.svgNS, "rect");
	r.setAttributeNS(null,"x",      0);
	r.setAttributeNS(null,"y",      0);	
	r.setAttributeNS(null,"width",  6*2+4*7*12-8);
	r.setAttributeNS(null,"height", 25+7*8);
	r.setAttributeNS(null,"fill",   "gainsboro");
	
	svg.appendChild(r);

	var segmentOn  = "black";	
	var segmentOff = "lightgray";
	
	var pixelWidth  = 3.5;
	var pixelHGap   = 0.5;
	var pixelHeight = 4.5;
	var pixelVGap   = 0.5;
	
	var x_offset = 6;
	var y_offset = 35;

	// make 2 pages of video memory
	var videoMemorySize = 96;
	this.videoMemory = new Uint8Array(videoMemorySize);
	this.videoPages = [new Uint8Array(videoMemorySize), new Uint8Array(videoMemorySize)];
	this.videoPage = [0,1];

	this.cursorReg = 0;

	this.cursorDelay = 35;
	this.cursorTimer = 0;
	this.cursorVisible = false;

	this.characters = [];
/* create 12 character places */
	for (var x = 0; x < 12; x++)
		this.characters.push(createDotMatrix(this.svg, 7,5,x_offset+x*((3.5+0.5)*7),y_offset,3.5,4.5,0.5,0.5,segmentOn,segmentOff));

/* array to sort out extra mappings */
	var extraMappings = [];

/* create text lcd segments */
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
	
	for(var x = 0; x<textSegs.length; x++) {
		var seg = textSegs[x];
		var mapping = {};
		mapping["addr"] = seg["addr"];
		mapping["bit"] = seg["bit"];
		mapping["f"] = createTextField(this.svg, seg.x, seg.y, seg.txt, 11, segmentOn, segmentOff);
		extraMappings.push(mapping);
	}

/* create 7Seg digits */
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

	for (var x = 0; x < sevenSegsMapping.length; x++) {
		// create seven-segment digit and get array of functions to access its segments
		var digit = create7SegDisplay(this.svg, 210.5+x*12*2, 7.5, 2, segmentOn, segmentOff);
		
		for(segment in digit)
		{
			var mapping = sevenSegsMapping[x][segment];
			// assign access function to mapping and add mapping to array
			mapping["f"] = digit[segment];
			extraMappings.push(mapping);
		}		
	}

	// create LCD memory mapping for addresses
	this.mapping = Array.apply(null, Array(videoMemorySize));

	for (var x = 0; x<this.characters.length; x++) {
		for (var y = 0; y<this.characters[x].length; y++) {
			this.mapping[(x<<3)+y+1] = this.characters[x][y];
		}
	}

	this.timerHandle = null;
	this.timerCallback = null;
	
	this.animate = function(delay_ms) {
		this.timerHandle = setInterval(this.doFrame, delay_ms);
	};
	this.stopAnimating = function() {
		clearInterval(this.timerHandle);
		this.timerHandle = null;
	};
	
	this.doFrame = function() {
	
		if(typeof this.timerCallback == "function") this.timerCallback();
	
		if(this.cursorTimer == 0) {
			this.cursorTimer = this.cursorDelay;
			this.cursorVisible = !this.cursorVisible;
		} else {
			this.cursorTimer--;
		}
		var cursorShape = (this.cursorVisible?
			((this.cursorReg&0x10)?[0,0,0,0,0,0,31]:[31,31,31,31,31,31,31])
			:[0,0,0,0,0,0,0]);

		var newPage = (this.videoPage[1]+1)%2;	
		var oldPage = (this.videoPage[0]+1)%2;
		var cursorAddr = ((this.cursorReg&0xf)<<3)+1;
		// copy videomemory into a buffer and overlay cursor image while we're at it
		for(var x = 0; x < this.videoPages[newPage].length; x++) {
			this.videoPages[newPage][x]=this.videoMemory[x];
			this.videoPages[newPage][x]|=((x>=cursorAddr)&&(x<cursorAddr+cursorShape.length))?
										 cursorShape[x-cursorAddr]:0;
			if((this.videoPages[newPage][x]!=this.videoPages[oldPage][x])&&(this.mapping[x]!=null))
				this.mapping[x](this.videoPages[newPage][x]);
		}
		this.videoPage[1]=(this.videoPage[1]+1)%2;
		this.videoPage[0]=(this.videoPage[0]+1)%2;
	};

/* almost there, map all extra segments to memory locations and generate byte writers */
	var byteMappings = {};
	for(var x = 0; x < extraMappings.length; x++) {
		var mapping = extraMappings[x];		// get mapping
		var b = (mapping.addr in byteMappings)?byteMappings[mapping.addr]:{};
		b[mapping.bit] = mapping.f; // assign a function
		byteMappings[mapping.addr] = b; // write it back
	}

/* and finally, generate byte writers and put them into array */	
	for(var m in byteMappings) this.mapping[m] = arbitraryWriter(byteMappings[m]);

	return this;
}

function arbitraryWriter(mapping) {
	var arr = Array.apply(null, Array(8));
	for(var b in mapping) arr[b] = mapping[b];
	return function(state) {
		var bits = state;
		var bitStates = arr;
		for(var k = 0; k < bitStates.length; k++)
		{
			if(bitStates[k]!=null) bitStates[k](bits&1);
			bits >>= 1;
		}
	};
}

function textFieldWriter(field, colorOn, colorOff) {
	return function(state) {
		field.setAttributeNS(null,"fill",state?colorOn:colorOff);
	};
}

function createTextField(root, x, y, text, size, colorOn, colorOff) {
	var txt = document.createElementNS(svgNS, "text");
	txt.setAttributeNS(null,"x", x);
	txt.setAttributeNS(null,"y", y);
	txt.setAttributeNS(null,"fill",colorOff);
	txt.setAttributeNS(null,"font-family","Arial");
	txt.setAttributeNS(null,"text-anchor","middle");
	txt.setAttributeNS(null,"font-size",size);
	var txtNode = document.createTextNode(text);
	txt.appendChild(txtNode);
	root.appendChild(txt);
	return(textFieldWriter(txt, colorOn, colorOff));
	
}

function createDotMatrix(root, rows, cols, x, y, dotWidth, dotHeight, dotHGap, dotVGap, dotColorOn, dotColorOff) {
	var writers = [];
	for(var i = 0; i < rows; i++) {
		var row = [];
		for(var j = 0; j < cols; j++) {
			// create dot
			var dot = document.createElementNS(svgNS, "rect");
			dot.setAttributeNS(null,"x", x+j*(dotWidth+dotHGap));
			dot.setAttributeNS(null,"y", y+i*(dotHeight+dotVGap));
			dot.setAttributeNS(null,"width",  dotWidth);
			dot.setAttributeNS(null,"height", dotHeight);
			dot.setAttributeNS(null,"fill", dotColorOff);
			dot.setAttributeNS(null,"stroke", "none");
			root.appendChild(dot);
			row.push(dot);
		}
		writers.push(dotMatrixRowWriter(row.slice(), dotColorOn, dotColorOff));
	}
	return writers;
}

function dotMatrixRowWriter(row, dotColorOn, dotColorOff) {
	return function(data) {
		var dots = row;
		var bits = data;
		for(var k = 0; k < dots.length; k++) {
			dots[k].setAttributeNS(null,"fill", (bits&1)?dotColorOn:dotColorOff);
			bits >>= 1;
		}
	};
}

/*
   a
   _
 f|_|b 
 e|_|c  
   d   

 and there's g in the middle
 just a little hint
 */


function set7SegWriter(segment, colorOn, colorOff) {
	return function(state) {
		segment.setAttributeNS(null,"stroke",state?colorOn:colorOff);
	};
}

function create7SegDisplay(root, x, y, scale, colorOn, colorOff) {
	// line coords from a to g
	var lines = {
		a:{x1:0+2,y1:0,x2:5+2,y2:0},
		b:{x1:5+2,y1:0,x2:5+1,y2:5},
		c:{x1:5+1,y1:5,x2:5+0,y2:10},
		d:{x1:5+0,y1:10,x2:0+0,y2:10},
		e:{x1:0+0,y1:10,x2:0+1,y2:5},
		f:{x1:0+1,y1:5,x2:0+2,y2:0},
		g:{x1:0+1,y1:5,x2:5+1,y2:5}
	};
	var offset = {x1:x, x2:x, y1:y, y2:y};
	var arr = {};
	for(var segName in lines) {
		var line = document.createElementNS(svgNS, "line");
		var segment = lines[segName];
		for (var coord in segment)
			line.setAttributeNS(null,coord,segment[coord]*scale+offset[coord]);
			
		line.setAttributeNS(null,"stroke", colorOff);
		
		root.appendChild(line);
		arr[segName] = set7SegWriter(line, colorOn, colorOff);
	}
//	console.log(arr);
	return arr;
}




