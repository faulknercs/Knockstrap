ko.bindingHandlers.toggle = {
    init: function (element, valueAccessor) {
        var value = valueAccessor();

        ko.utils.registerEventHandler(element, 'click', function() {
            var previousValue = ko.unwrap(value);
            value(!previousValue);
        });
    },
    
    update: function (element, valueAccessor) {
        ko.utils.toggleDomNodeCssClass(element, 'active', ko.unwrap(valueAccessor()));
    }
};
