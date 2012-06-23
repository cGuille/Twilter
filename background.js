(function (exported, MuteManager) {
    "use strict";
    
    var clients = [],
        mute_manager = new MuteManager(localStorage.parseAndGetItem("muted"));

    exported.getMutedAccounts = function () {
        return mute_manager.muted.accounts;
    };
    exported.getMutedKeywords = function () {
        return mute_manager.muted.keywords;
    };

    exported.add_account = function (account_name) {
        var done = mute_manager.muteAccount(account_name);

        if (done) {
            update_clients();
        }
        return done;
    };
    exported.add_keyword = function (keyword) {
        var done = mute_manager.muteKeyword(keyword);

        if (done) {
            update_clients();
        }
        return done;
    };
    exported.remove_account = function (account_name) {
        var done = mute_manager.unMuteAccount(account_name);

        if (done) {
            update_clients();
        }
        return done;
    };
    exported.remove_keyword = function (keyword) {
        var done = mute_manager.unMuteKeyword(keyword);

        if (done) {
            update_clients();
        }
        return done;
    };

    function update_clients() {
        var i;

        localStorage.stringifyAndSetItem("muted", mute_manager.muted);

        for (i = clients.length - 1; i >= 0; i -=1) {
            console.log("sending message to tab #" + clients[i]);
            chrome.tabs.sendRequest(
                clients[i],
                {
                    type: "update",
                    data: {
                        backup: mute_manager.muted
                    }
                },
                null
            );
        }
    }

    chrome.extension.onRequest.addListener(
        function (request, sender, sendResponse) {
            console.log("received " + request.type + " request from tab #" + sender.tab.id);
            if (clients.indexOf(sender.tab.id) === -1) {
                clients.push(sender.tab.id);
            }
            sendResponse({type: "connection-response", data: {backup: mute_manager.muted}});
        }
    );
}(this, Twilter.MuteManager));
