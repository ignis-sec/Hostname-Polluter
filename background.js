
//default values
var _active=false, _hostname="localhost";


//find browser type
if (typeof chrome !== "undefined")
	if (typeof browser !== "undefined")
		browserAgent = "Firefox";
	else browserAgent = "Chrome";
else
	browserAgent = "Edge";

if (browserAgent == "Chrome") 
	client=chrome;
else 
	client=browser;

//modify headers before sending using onBeforeSendHeaders hook
client.webRequest.onBeforeSendHeaders.addListener(
	function(details) {
			//if extension is disabled, do not modify anything
			if(_active==false) return {requestHeaders: details.requestHeaders}
			details.requestHeaders.push({
				name: 'Host',
				value: _hostname
			});
			return {requestHeaders: details.requestHeaders};
		},
	//metadata
	{urls: ["<all_urls>"]},
	["blocking", "requestHeaders"]
);

function handleConnection(port){
	console.log("Connected .....");
	port.postMessage({active:_active, host:_hostname})
	port.onMessage.addListener(function(msg) {
		_active = msg.active;
        _hostname = msg.host;
        console.log(msg)
    });
}

//connect to popup window
if (browserAgent == "Chrome") 
	chrome.extension.onConnect.addListener(handleConnection)
else //firefox
	browser.runtime.onConnect.addListener(handleConnection)