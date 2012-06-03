(function () {
    "use strict";

    console.log("started");

    var muted = {
        accounts: [
            // "cGuilleDev"
        ],
        keywords: [
            // "test"
        ]
    };

    function Tweet(id, author, content) {
        this.id = id;
        this.author = author;
        this.content = content;
    }

    Tweet.prototype.isBlackListed = function(muted) {
        var i,
            len;

        if (muted.accounts.indexOf(this.author) !== -1) {
            return true;
        }

        for (i = 0, len = muted.keywords.length; i < len; i += 1) {
            if (this.content.indexOf(muted.keywords[i]) !== -1) {
                return true;
            }
        }

        return false;
    };

    Tweet.prototype.toString = function() {
        return JSON.stringify(this);
    };

    document.getElementById('stream-items-id').addEventListener(
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

        if (tweet.isBlackListed(muted)) {
            tweet_div.parentNode.removeChild(tweet_div);
            console.log("Removed :\n" + tweet.toString());
        }
    }
}) ();