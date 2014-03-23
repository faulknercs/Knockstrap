ko.utils.uniqueId = (function () {

    var prefixesCounts = {
        'ks-unique-': 0
    };

    return function (prefix) {
        prefix = prefix || 'ks-unique-';

        if (!prefixesCounts[prefix]) {
            prefixesCounts[prefix] = 0;
        }

        return prefix + prefixesCounts[prefix]++;
    };
})();