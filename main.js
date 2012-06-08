(function (Tweet, uteManager) {
    "use strict";

    var mute_manager = new MuteManager({
        accounts: [
            "cGuilleDev"
            // , ""
        ],
        keywords: [
            "test"
            // , ""
        ]
    });

// Todo: scanner le DOM au chargement
// Todo: gérer les messages pour récupérer la conf depuis le localStorage de l'extension
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

        if (tweet.isBlackListed(mute_manager)) {
            tweet_div.parentNode.removeChild(tweet_div);
            console.log("Removed :\n" + tweet.toString());
        }
    }

    function Tweet(id, author, content) {
        this.id = id;
        this.author = author;
        this.content = content;
    }

    Tweet.prototype.isBlackListed = function(mute_manager) {
        return mute_manager.isMutedAccount(this.author) || mute_manager.containsMutedKeyword(this.content);
    };

    Tweet.prototype.toString = function() {
        return JSON.stringify(this);
    };
}) (window.Twilter.Tweet, window.Twilter.MuteManager);
