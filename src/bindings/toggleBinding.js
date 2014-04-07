ko.bindingHandlers.toggle = {
    init: function (element, valueAccessor) {
        var value = valueAccessor();

        if (!ko.isObservable(value)) {
            throw new Error('toggle binding should be used only with observable values');
        }

        $(element).on('click', function () {
            var previousValue = ko.unwrap(value);
            value(!previousValue);
        });
    },
    
    update: function (element, valueAccessor) {
        ko.utils.toggleDomNodeCssClass(element, 'active', ko.unwrap(valueAccessor()));
    }
};
