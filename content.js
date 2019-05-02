var _hostname = "localhost"
var _active = "false";


 var port = chrome.extension.connect({
      name: "Variable highway"
 });

 port.onMessage.addListener(function(msg){
 	console.log(msg)
 	msg = msg.split(',');
 	_active = msg[0];
 	_hostname = msg[1];
 	console.log(_active)
 	if(_active=="true") _extEnable();
 	$("#host-field").val(_hostname);
 })

function setHost(){
	_hostname = $("#host-field").val();
	port.postMessage("host===" + _hostname);
	window.close();
}

$(document).ready(function(){
	document.getElementById('ext-btn').onclick = function(){toggleExtension();}
	document.getElementById('ok-btn').onclick = function(){setHost();}
})

function toggleExtension(){
	if(_active=="false"){
		_extEnable();
	}else{
		_extDisable()
	}
	 port.postMessage("active===" + String(_active));
}

function _extEnable(){
	console.log("Enabling")
	_active=true;
	$("#ext-btn").addClass("ext-enabled");
	$("#ext-btn").removeClass("ext-disabled");
	$("#ext-btn").html("Disable")
}

function _extDisable(){
	console.log("Disabling")
	_active=false;
	$("#ext-btn").removeClass("ext-enabled");
	$("#ext-btn").addClass("ext-disabled");
	$("#ext-btn").html("Enable");
}