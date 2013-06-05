(function () {
    "use strict";

    if (! window.Twilter) {
        window.Twilter = {};
    }

    window.Twilter.Tweet = Tweet;

    function Tweet(data) {
        this.id = data.id;
        this.author = data.author;
        this.retweeter = data.retweeter;
        this.content = data.content;
    }

    Tweet.prototype.isBlackListed = function(mute_manager) {
        return mute_manager.isMutedAccount(this.author) || mute_manager.isMutedAccount(this.retweeter) || mute_manager.containsMutedKeyword(this.content);
    };

    Tweet.prototype.toString = function() {
        return JSON.stringify(this);
    };
}());
