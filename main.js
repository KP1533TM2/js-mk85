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
loadBinary("ram.bin", function (buf) { RAM = new Uint8Array(buf); checkIfMemoryLoaded(); });
loadBinary("rom.bin", function (buf) { ROM = new Uint8Array(buf); checkIfMemoryLoaded(); });

