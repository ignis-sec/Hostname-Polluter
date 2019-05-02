var _active="false", _hostname="localhost";


chrome.webRequest.onBeforeSendHeaders.addListener(
    function(details) {
    	if(_active=="false"){return {requestHeaders: details.requestHeaders};}
		details.requestHeaders.push({
	        name: 'Host',
	        value: _hostname
	    });
          return {requestHeaders: details.requestHeaders};
    },

    {urls: ["<all_urls>"]},
    ["blocking", "requestHeaders"]
);


//chrome.webRequest.onBeforeRequest.addListener(



chrome.extension.onConnect.addListener(function(port) {
      console.log("Connected .....");
      port.postMessage(String(_active) + "," + _hostname)
      port.onMessage.addListener(function(msg) {
      		console.log(msg)
           	var passed = msg.split("===");
           	if(passed[0]==="active"){
           		_active = passed[1]
           	}else if(passed[0]==="host"){
           		_hostname = passed[1]
           	}
        console.log(_active)
        console.log(_hostname)
      });
 })