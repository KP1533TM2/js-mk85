/* Top level script for MK-85 emulator.
 * Trying to keep things simple this time and not cram the entire thing into a single object.
 * Although that would be handy, who knows, maybe I want to run 3 calculators on a single page
 * concurrently =)
 * 
 * 
 */

window.onload = function() {
	
	document.body.appendChild(GUI);
};

var GUI = composeGUI();
var LCD = new MK85_SVG_LCD();

GUI.appendChild(LCD.svg);

var MK85CPU = new CPU();
var RAM = null;
var ROM = null;

// Load RAM and ROM contents

var ramCookie = getCookie("ram");

if(typeof ramCookie == 'undefined') {
	console.log("Getting RAM contents from ram.bin");
	loadBinary("ram.bin", function (buf) { RAM = new Uint8Array(buf); checkIfMemoryLoaded(); });	
} else {
	console.log("Getting RAM contents from cookie");
	RAM = new Uint8Array(_base64ToArrayBuffer(ramCookie));
}

loadBinary("rom.bin", function (buf) { ROM = new Uint8Array(buf); checkIfMemoryLoaded(); });


window.onunload = function() {
	// Store cookie with RAM contents
	var b64 = btoa(String.fromCharCode.apply(null, RAM));
	setCookie("ram", b64, {expires:1209600});
}
