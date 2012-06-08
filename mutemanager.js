(function () {
    "use strict";

    if (! window.Twilter) {
        window.Twilter = {};
    }

    window.Twilter.MuteManager = MuteManager;

    function MuteManager(backup) {
        this.muted = backup || {};

        if (!this.muted.accounts) {
            this.muted.accounts = [];
        }

        if (!this.muted.keywords) {
            this.muted.keywords = [];
        }
    }

    MuteManager.prototype.muteAccount = function(account_name) {
        if (this.muted.accounts.indexOf(account_name) === -1) {
            this.muted.accounts.push(account_name);
            return true;
        }

        return false;
    };

    MuteManager.prototype.muteKeyword = function(keyword) {
        if (this.muted.keywords.indexOf(keyword) === -1) {
            this.muted.keywords.push(keyword);
            return true;
        }

        return false;
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
}());
