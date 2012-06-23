(function (MuteManager) {
    var bg = chrome.extension.getBackgroundPage(),

        i, len,
        muted_accounts = bg.getMutedAccounts(),
        muted_keywords = bg.getMutedKeywords(),

        input_add_account = document.querySelector("input#add-muted-account"),
        accounts_list_elt = document.querySelector("fieldset#muted-accounts-options-list"),

        input_add_keyword = document.querySelector("input#add-muted-keyword"),
        keywords_list_elt = document.querySelector("fieldset#muted-keywords-options-list");

    for (i = 0, len = muted_accounts.length; i < len; i += 1) {
        dom_insert_account(muted_accounts[i]);
    }
    for (i = 0, len = muted_keywords.length; i < len; i += 1) {
        dom_insert_keyword(muted_keywords[i]);
    }

    // Listening to events that imply to add an account
    document.querySelector("div#muted-accounts-settings fieldset.add-form button.add-button").onclick = add_account;
    input_add_account.onkeypress = function (e) {
        if (e.keyCode === 13) {
            add_account();
        }
    };

    // Listening to events that imply to add a keyword
    document.querySelector("div#muted-keywords-settings fieldset.add-form button.add-button").onclick = add_keyword;
    input_add_keyword.onkeypress = function (e) {
        if (e.keyCode === 13) {
            add_keyword();
        }
    };

    function dom_insert_account(name) {
        var item_elt = document.createElement("div"),
            label_elt = document.createElement("label"),
            btn_elt = document.createElement("button"),
            span_elt = document.createElement("span"),
            br_elt = document.createElement("br");
            text_node = document.createTextNode(" ");

        btn_elt.textContent = "supprimer";
        btn_elt.onclick = function () {
            bg.remove_account(name);
            accounts_list_elt.removeChild(item_elt);
        };
        label_elt.appendChild(btn_elt);

        span_elt.textContent = name;

        item_elt.appendChild(label_elt);
        item_elt.appendChild(text_node);
        item_elt.appendChild(span_elt);
        item_elt.appendChild(br_elt);
        accounts_list_elt.appendChild(item_elt);
    }

    function add_account() {
        var account_name = input_add_account.value.trim();

        if (bg.add_account(account_name)) {
            dom_insert_account(account_name);
        }
        input_add_account.value = "";
    }

    // Managing keywords settings
    function dom_insert_keyword(keyword) {
        var item_elt = document.createElement("div"),
            label_elt = document.createElement("label"),
            btn_elt = document.createElement("button"),
            span_elt = document.createElement("span"),
            br_elt = document.createElement("br");
            text_node = document.createTextNode(" ");

        btn_elt.textContent = "supprimer";
        btn_elt.onclick = function () {
            bg.remove_keyword(keyword);
            keywords_list_elt.removeChild(item_elt);
        };
        label_elt.appendChild(btn_elt);

        span_elt.textContent = keyword;

        item_elt.appendChild(label_elt);
        item_elt.appendChild(text_node);
        item_elt.appendChild(span_elt);
        item_elt.appendChild(br_elt);
        keywords_list_elt.appendChild(item_elt);
    }

    function add_keyword() {
        var keyword = input_add_keyword.value.trim();

        if (bg.add_keyword(keyword)) {
            dom_insert_keyword(keyword);
        }
        input_add_keyword.value = "";
    }
}(Twilter.MuteManager));
