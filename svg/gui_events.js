var supportsVibrate = "vibrate" in navigator;

var uniquesPressed = [];

window.addEventListener('keydown', KBKeyPress, true);
window.addEventListener('keyup', KBKeyRelease, true);

function keyByCode(keyCode) {
	for (var key in keyboardMapping)
		if(keyboardMapping[key] === keyCode) return key
	return undefined;
}

function KBKeyPress(evt) {

	console.log(evt.keyCode.toString(16));

	var key = keyByCode(evt.keyCode);
	if(typeof key == 'undefined') return;

	evt.preventDefault();

	// find the key in mapping
	if((uniquesPressed.indexOf(key) == -1)&&(uniquesPressed.length < 2)) {
		if(key=="stop") MK85CPU.flag_halt = true;
		uniquesPressed.push(key);
		console.log(uniquesPressed);
	}
}

function KBKeyRelease(evt) {

	var key = keyByCode(evt.keyCode);
	if(typeof key == 'undefined') return;

	evt.preventDefault();

	if(uniquesPressed.indexOf(key) != -1) {
		uniquesPressed.splice(key, 1);
		console.log(uniquesPressed);
	}
}

function GUIKeyPress(evt) {
	var key = evt.currentTarget.id;
	evt.preventDefault();
	if(supportsVibrate) window.navigator.vibrate(100);

	if((uniquesPressed.indexOf(key) == -1)&&(uniquesPressed.length < 2)) {
		if((key=="stop")&&(!MK85CPU.flag_halt)) MK85CPU.flag_halt = true;
		uniquesPressed.push(key);
		console.log(uniquesPressed);
	}
}

function GUIKeyRelease(evt) {
	evt.preventDefault();
	var key = evt.currentTarget.id;

	if(uniquesPressed.indexOf(key) != -1) {
		uniquesPressed.splice(key, 1);
		console.log(uniquesPressed);
	}
}
