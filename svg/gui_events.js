var supportsVibrate = "vibrate" in navigator;

var GUIKeysPressed = [];
var GUIKeysPressedMax = 2;

var KBKeysPressed = [];
var KBKeysPressedMax = 2;

var uniquesPressed = [];

window.addEventListener('keydown', KBKeyPress, true);
//window.addEventListener('keypress', KBKeyPress, true);

window.addEventListener('keyup', KBKeyRelease, true);

function keyByCode(keyCode) {
	for (var key in keyboardMapping)
		if(keyboardMapping[key] === keyCode) return key
	return undefined;
}

function KBKeyPress(evt) {
	evt.preventDefault();
	var key = keyByCode(evt.keyCode);
	if(typeof key == 'undefined') return;
	// find the key in mapping
	if((uniquesPressed.indexOf(key) == -1)&&(uniquesPressed.length < 2)) {
		uniquesPressed.push(key);
		console.log(uniquesPressed);
	}
}

function KBKeyRelease(evt) {
	evt.preventDefault();
	var key = keyByCode(evt.keyCode);
	if(typeof key == 'undefined') return;

	if(key=="stop") MK85CPU.flag_halt = true;

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
		uniquesPressed.push(key);
		console.log(uniquesPressed);
	}
}

function GUIKeyRelease(evt) {
	evt.preventDefault();
	var key = evt.currentTarget.id;

	if(key=="stop") MK85CPU.flag_halt = true;

	if(uniquesPressed.indexOf(key) != -1) {
		uniquesPressed.splice(key, 1);
		console.log(uniquesPressed);
	}
}
