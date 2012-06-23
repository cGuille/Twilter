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

    function account_index(account_name) {
        var i,
            index,
            regex = new RegExp("^" + account_name + "$", "i");

        for (i = this.muted.accounts.length - 1; i >= 0; i -= 1) {
            if (-1 !== (index = this.muted.accounts[i].search(regex))) {
                return index;
            }
        }
        return -1;
    }

    MuteManager.prototype.isMutedAccount = function(account_name) {
        return account_index.call(this, account_name) !== -1;
    };

    MuteManager.prototype.muteAccount = function(account_name) {
        if (!this.isMutedAccount(account_name)) {
            this.muted.accounts.push(account_name);
            return true;
        }
        return false;
    };

    MuteManager.prototype.unMuteAccount = function(account_name) {
        var index = account_index.call(this, account_name);

        if (index !== -1) {
            this.muted.accounts.splice(index, 1);
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

    MuteManager.prototype.unMuteKeyword = function(keyword) {
        var index = this.muted.keywords.indexOf(keyword);

        if (index !== -1) {
            this.muted.keywords.splice(index, 1);
            return true;
        }
        return false;
    };

    //!\ This method uses early return.
    MuteManager.prototype.containsMutedKeyword = function(content) {
        var i;

        for (i = this.muted.keywords.length - 1; i >= 0; i -= 1) {
            if (content.search(new RegExp("\\b" + this.muted.keywords[i] + "\\b", "i")) !== -1) {
                return true;
            }
        }
        return false;
    };
}());
