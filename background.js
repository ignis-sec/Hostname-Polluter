
//default values
var _active=false, _hostname="localhost";


//modify headers before sending using onBeforeSendHeaders hook
chrome.webRequest.onBeforeSendHeaders.addListener(
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


//connect to popup window
chrome.extension.onConnect.addListener(function(port) {
	console.log("Connected .....");
	port.postMessage({active:_active, host:_hostname})
	port.onMessage.addListener(function(msg) {
		_active = msg.active;
        _hostname = msg.host;
        console.log(msg)
    });
})