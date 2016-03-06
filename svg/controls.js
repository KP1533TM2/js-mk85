function MK85_MAINBUTTON(x,y,txtAbove,txtBelow,label,labelColor,onPress,onRelease) {
	this.txtAbove   = txtAbove;
	this.txtBelow   = txtBelow;
	this.label      = label;
	this.labelColor = labelColor;
	this.onPress    = onPress;
	this.onRelease  = onRelease;
	this.x          = x;
	this.y          = y;
	this.attributes = [
		{type:"rect", attrs:{x:0,y:0,width:"30",height:"15",fill:"black"}},
		{type:"rect", attrs:{x:1,y:1,width:"28",height:"13",fill:"black"}}
	];
	
}

MK85_MAINBUTTON.prototype.getButton = function() {
	var button = document.createElementNS(svgNS,"g");
	
	return button;
};
/*

			var dot = document.createElementNS(svgNS, "rect");
			dot.setAttributeNS(null,"x", x+j*(dotWidth+dotHGap));
			dot.setAttributeNS(null,"y", y+i*(dotHeight+dotVGap));
			dot.setAttributeNS(null,"width",  dotWidth);
			dot.setAttributeNS(null,"height", dotHeight);
			dot.setAttributeNS(null,"fill", dotColorOff);
			dot.setAttributeNS(null,"stroke", "none");
*/
