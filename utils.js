// Creating accessors which automatically parse JSON data

Storage.prototype.parseAndGetItem = function (key) {
    return typeof(this[key]) !== 'undefined' ? JSON.parse(this[key]) : null;
};
Storage.prototype.stringifyAndSetItem = function (key, data) {
    this[key] = JSON.stringify(data);
};
