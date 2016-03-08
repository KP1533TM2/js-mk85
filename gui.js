svgNS = "http://www.w3.org/2000/svg";

function composeGUI() {
	var root = createSVG(640,480,"background-color:gainsboro");
	
	createButtonsOn(root);
	
	return root;
}

function createSVG(w,h,style) {
	var svg = document.createElementNS(svgNS, "svg");
	svg.setAttributeNS(null,"width",  w);
	svg.setAttributeNS(null,"height", h);
	svg.setAttributeNS(null,"style", style); // "background-color:gainsboro"
	return svg;
}

function createKeyText(color, size, x, y, text) {
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

function createButtonsOn(svg) {
	for(var keyKey in faceKeys) {
		var key = faceKeys[keyKey];	// no pun intended =)

		var g = document.createElementNS(svgNS, "g");
		g.setAttributeNS(null,"cursor","pointer");
		g.setAttributeNS(null,"id", keyKey);
		g.setAttributeNS(null,"class", "mk85btn");

		switch(key.type) {
			case 0: // small white thing with labels above
			{
				var rect = document.createElementNS(svgNS, "rect");
				var blockType = blockTypes[key.type];
				
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
					g.appendChild(createKeyText(colorOn,11, x+25/2, y+12, key.lblOn));
				if(typeof key.lblBelow != 'undefined')
					svg.appendChild(createKeyText("blue",7, x+25/2, y+23, key.lblBelow));
				if(typeof key.lblAbove != 'undefined')
					svg.appendChild(createKeyText(colorAbove,7, x+25/2, y-3, key.lblAbove));
				if(typeof key.lblRight != 'undefined')
					svg.appendChild(createKeyText("black",7, x+30, y+10, key.lblRight)); 
				
				break;
			}
			case 1:		// numpad buttons
			{
				var rect = document.createElementNS(svgNS, "rect");
				var blockType = blockTypes[key.type];
				
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
					g.appendChild(createKeyText(colorOn,11, x+width/2, y+12, key.lblOn));
				if(typeof key.lblBelow != 'undefined')
					svg.appendChild(createKeyText("blue",7, x+25/2, y+23, key.lblBelow));
				if(typeof key.lblAbove != 'undefined')
					svg.appendChild(createKeyText(colorAbove,7, x+25/2, y-3, key.lblAbove));
				if(typeof key.lblRight != 'undefined')
					svg.appendChild(createKeyText("black",7, x+30, y+10, key.lblRight)); 
				
				break;
			}
			default:
			{
				console.log("unsupported type");
				break;
			}
		}
		// bind functions
/*		g.setAttributeNS(null,"onmouseup","keyRelease(event)");
		g.setAttributeNS(null,"onmouseout","keyRelease(event)");
		g.setAttributeNS(null,"onmousedown","keyPress(event)");*/
		
		g.addEventListener("touchstart", GUIKeyPress, false);
		g.addEventListener("touchend", GUIKeyRelease, false);
				
		g.setAttributeNS(null,"onmouseup","GUIKeyRelease(event)");
		g.setAttributeNS(null,"onmouseout","GUIKeyRelease(event)");
		g.setAttributeNS(null,"onmousedown","GUIKeyPress(event)");		

		svg.appendChild(g);
	}
}
