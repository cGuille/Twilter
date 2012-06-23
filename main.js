(function (Tweet, MuteManager) {
    "use strict";

    var container_elt = document.getElementById('stream-items-id'),
        mute_manager = new MuteManager();

    chrome.extension.onRequest.addListener(
        function (request, sender, sendResponse) {
            console.log("received " + request.type + " request");
            // console.log("BEFORE mute_manager.muted = " + JSON.stringify(mute_manager.muted));
            mute_manager.muted = request.data.backup;
            // console.log("AFTER  mute_manager.muted = " + JSON.stringify(mute_manager.muted));
            scanDOM();
        }
    );

    // Sending a connection message to the background page
    chrome.extension.sendRequest({type: "connection"}, function (response) {
        if (response.type !== "connection-response") {
            window.alert("Twilter error : no connection-response");
        } else {
            mute_manager.muted = response.data.backup;
            console.log("received connection-response: ", response.data.backup);
        }
        // Now we have the muted object, we can start to scan
        main();
    });
    // Listening to close event on window in order to send a disconnection message to the background page
    window.addEventListener("close", function () {
        chrome.extension.sendRequest({type: "disconnection"});
    }, false);

    function main() {
        // Listening to the DOMNodeInserted event in order to scan every inserted tweet
        container_elt.addEventListener(
            "DOMNodeInserted",
            function(e) {
                if (e.target.classList && e.target.classList.contains("stream-item")) {
                    handle(e.target.querySelector("div.tweet"));
                }
            },
            false
        );

        scanDOM();
    }

    // This is how we handle each tweet
    function handle(tweet_div) {
        var tweet = new Tweet(
                tweet_div.getAttribute("data-item-id"),
                tweet_div.getAttribute("data-screen-name"),
                tweet_div.querySelector("p.js-tweet-text").textContent
            );

        if (tweet.isBlackListed(mute_manager)) {
            tweet_div.parentNode.removeChild(tweet_div);
            console.log("Twilter removed a tweet:\n" + tweet.toString());
        }
    }

    // Scanning the existing DOM:
    function scanDOM() {
        var i,
            len,
            tweet_divs = container_elt.querySelectorAll("div.tweet");

        for (i = 0, len = tweet_divs.length; i < len; i += 1) {
            handle(tweet_divs[i]);
        }
    }
}) (window.Twilter.Tweet, window.Twilter.MuteManager);
