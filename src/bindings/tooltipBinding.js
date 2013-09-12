ko.bindingHandlers.tooltip = {
    init: function (element) {
        var $element = $(element);

        ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
            if ($element.data('bs.tooltip')) {
                $element.tooltip('destroy');
            }
        });
    },

    update: function (element, valueAccessor) {
        var $element = $(element),
            value = ko.unwrap(valueAccessor()),
            options = ko.utils.unwrapProperties(value);

        var tooltipData = $element.data('bs.tooltip');

        if (!tooltipData) {
            $element.tooltip(options);
        } else {
            ko.utils.extend(tooltipData.options, options);
        }
    }
};
