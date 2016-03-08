var supportsVibrate = "vibrate" in navigator;

var GUIKeysPressed = [];
var GUIKeysPressedMax = 2;

var KBKeysPressed = [];
var KBKeysPressedMax = 10;

window.addEventListener('keydown', KBKeyPress, true);
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
	if((KBKeysPressed.indexOf(key) == -1)&&(KBKeysPressed.length < KBKeysPressedMax)) {
		KBKeysPressed.push(key);
		console.log(KBKeysPressed);
	}
}

function KBKeyRelease(evt) {
	evt.preventDefault();
	var key = keyByCode(evt.keyCode);
	if(typeof key == 'undefined') return;
	if((KBKeysPressed.indexOf(key) != -1)&&(KBKeysPressed.length > 0)) {
		KBKeysPressed.splice(key, 1);
		console.log(KBKeysPressed);
	}
}

function GUIKeyPress(evt) {
	var key = evt.currentTarget.id;
	evt.preventDefault();
	if(supportsVibrate) window.navigator.vibrate(100);
	if((GUIKeysPressed.indexOf(key) == -1)&&(GUIKeysPressed.length < GUIKeysPressedMax)) {
		GUIKeysPressed.push(key);
	}
	console.log(GUIKeysPressed);
}

function GUIKeyRelease(evt) {
	evt.preventDefault();
	var key = evt.currentTarget.id;
	if((GUIKeysPressed.indexOf(key) != -1)&&(GUIKeysPressed.length > 0)) {
		GUIKeysPressed.splice(key, 1);
	}
	console.log(GUIKeysPressed);
}
