ko.utils.uniqueId = (function () {

    var count = 0;

    return function(prefix) {
        var id = prefix || 'ks-unique-';

        return id + count++;
    };
})();