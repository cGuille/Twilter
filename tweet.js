(function () {
    "use strict";

    if (! window.Twilter) {
        window.Twilter = {};
    }

    window.Twilter.Tweet = Tweet;

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
}());
