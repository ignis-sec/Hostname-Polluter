
//set default values
var _hostname = "localhost"
var _active = false;
var bReady = false;

//override console.log to write on background elements console
console.log = function(txt){
	port.postMessage({active:_active, host:_hostname, debug:txt});
}

//create pipe to communicate between popup and extension backend
var port = chrome.extension.connect({
	name: "Variable Highway for Polluter"
});

//when there is a response from backend
port.onMessage.addListener(function(msg){
	_active = msg.active;
	_hostname = msg.host;
	if(_active==true) _extEnable();
	else _extDisable()
	if(bReady) document.getElementById('host-field').value = _hostname; //ask what host we were using to background.
})


//set host for the backend
function setHost(){
	_hostname = document.getElementById('host-field').value;
	port.postMessage({active:_active, host:_hostname});
	window.close();
}

//set active/deactive for backend
function toggleExtension(){
	if(_active==false){
		_extEnable();
	}else{
		_extDisable();
	}
	port.postMessage({active:_active, host:_hostname});
}

//manage variables and visuals for activation
function _extEnable(){
	console.log("Enabling extension")
	_active=true;
	document.getElementById("ext-btn").classList.add("ext-enabled");
	document.getElementById("ext-btn").classList.remove("ext-disabled");
	document.getElementById("ext-btn").innerHTML = "Disable";
}

//manage variables and visuals for deactivation
function _extDisable(){
	console.log("Disabling extension")
	_active=false;
	document.getElementById("ext-btn").classList.remove("ext-enabled");
	document.getElementById("ext-btn").classList.add("ext-disabled");
	document.getElementById("ext-btn").innerHTML = "Enable";
}

//do when extension button is clicked
function initializePopup(state){
	if(state==0) console.log("Dom Loaded")
	console.log("Beep Boop Hostname popup online")
	document.getElementById('ext-btn').onclick = function(){toggleExtension()}
	document.getElementById('ok-btn').onclick = function(){setHost()}
	bReady = true;
}

//initialize
console.log("Dom state: " + document.readyState)
//dom may sometimes load before event listener is registered. This eliminates that misfortune.
if(document.readyState === 'loading') {
	document.addEventListener("DOMContentLoaded", function(){initializePopup(0)}, false);
}else{
	initializePopup(1)
}
