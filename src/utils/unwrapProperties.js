ko.utils.unwrapProperties = function (wrappedProperies) {

    if (wrappedProperies === null || typeof wrappedProperies !== 'object') {
        return wrappedProperies;
    }

    var options = {};

    ko.utils.objectForEach(wrappedProperies, function (propertyName, propertyValue) {
        options[propertyName] = ko.unwrap(propertyValue);
    });

    return options;
};