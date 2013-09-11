ko.bindingHandlers.popover = {

    init: function (element, valueAccessor) {
        var $element = $(element),
            value = ko.unwrap(valueAccessor()),
            options = ko.utils.unwrapProperties(value.options),
            template = value.template,
            data = value.data;

        if ('template' in value) {

            var id = ko.utils.uniqueId('ks-popover-');

            options.content = '<div id="' + id + '" ></div>';
            options.html = true;

            $element.on(options.trigger, function () {
                setTimeout(function() {
                    ko.renderTemplate(template, data, {}, document.getElementById(id));
                }, 0);
            });

        }

        $element.popover(options);

        return { controlsDescendantBindings: true };
    },

    update: function (element, valueAccessor) {
        var $element = $(element),
            value = ko.unwrap(valueAccessor()),
            options = ko.utils.unwrapProperties(value.options);
        
        var popoverData = $element.data('bs.popover');
        ko.utils.extend(popoverData.options, options);
    }
};