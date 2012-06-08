var clients = {};

chrome.extension.onRequest.addListener(
    function (request, sender, sendResponse) {
    	if (clients.keys.indexOf(sender.id) === -1) {
    		clients[sender.id] = sendResponse;
    	}
        sendResponse({backup: localStorage.backup});
    }
);
