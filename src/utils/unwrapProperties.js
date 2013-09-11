ko.utils.unwrapProperties = function (wrappedProperies) {
    var options = {};

    ko.utils.objectForEach(wrappedProperies, function (propertyName, propertyValue) {
        options[propertyName] = ko.unwrap(propertyValue);
    });

    return options;
};