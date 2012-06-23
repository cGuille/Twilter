// Creating accessors which automatically parse JSON data
// Is there a way to use it as : localStorage.parser.getItem("item") ?

Storage.prototype.parseAndGetItem = function (key) {
    return this[key] ? JSON.parse(this[key]) : null;
};
Storage.prototype.stringifyAndSetItem = function (key, data) {
    this[key] = JSON.stringify(data);
};
