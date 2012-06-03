(function () {
    "use strict";

    console.log("started");

    function MuteManager(backup) {
        this.muted = backup || {
            accounts: [],
            keywords: []
        };
    }

    MuteManager.prototype.muteAccount = function(account_name) {
        if (this.muted.accounts.indexOf(account_name) === -1) {
            this.muted.accounts.push(account_name);
        }

        return this;
    };

    MuteManager.prototype.muteKeyword = function(keyword) {
        if (this.muted.keywords.indexOf(keyword) === -1) {
            this.muted.keywords.push(keyword);
        }

        return this;
    };

    MuteManager.prototype.isMutedAccount = function(account_name) {
        return this.muted.accounts.indexOf(account_name) !== -1;
    };

    // Careful, this method uses early return.
    // TODO: use another method (regex?) to provide case insensitive research
    MuteManager.prototype.containsMutedKeyword = function(content) {
        var i,
            len;

        for (i = 0, len = this.muted.keywords.length; i < len; i += 1) {
            if (content.indexOf(this.muted.keywords[i]) !== -1) {
                return true;
            }
        }

        return false;
    };

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

    var mute_manager = new MuteManager().
            muteAccount("cGuilleDev").
            muteKeyword("mute-me");

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
}) ();
