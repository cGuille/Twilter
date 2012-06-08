(function (Tweet, MuteManager) {
    "use strict";

    // Note: For now, this script only take care of the Twitter home timeline.

    // Note: This backup object is for dev purpose only. It will eventually be fetch in the localStorage.
    var mute_manager = new MuteManager({
            accounts: [
                //"cGuilleDev"
                // , ""
            ],
            keywords: [
                "test"
                // , ""
            ]
        }),
        container_elt = document.getElementById('stream-items-id');

    // Scanning the existing DOM:
    (function () {
        var i,
            len,
            tweet_divs = container_elt.querySelectorAll("div.tweet");

        for (i = 0, len = tweet_divs.length; i < len; i += 1) {
            handle(tweet_divs[i]);
        }
    }());

    // Scanning every inserted tweet:
    container_elt.addEventListener(
        "DOMNodeInserted",
        function(e) {
            if (e.target.classList && e.target.classList.contains("stream-item")) {
                handle(e.target.querySelector("div.tweet"));
            }
        },
        false
    );

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
}) (window.Twilter.Tweet, window.Twilter.MuteManager);
