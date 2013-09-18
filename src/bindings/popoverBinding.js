var popoverDomDataTemplateKey = '__popoverTemplateKey__';

ko.bindingHandlers.popover = {

    init: function (element) {
        var $element = $(element);

        ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
            if ($element.data('bs.popover')) {
                $element.popover('destroy');
            }
        });

        return { controlsDescendantBindings: true };
    },

    update: function (element, valueAccessor) {
        var $element = $(element),
            value = ko.unwrap(valueAccessor()),
            options = ko.utils.unwrapProperties(value.options);

        if ('template' in value) {
            // use unwrap to local var to track dependency from template, if it is observable
            var template = ko.unwrap(value.template),
                id = ko.utils.domData.get(element, popoverDomDataTemplateKey),
                data = ko.unwrap(value.data);
                
            if (!id) {
                id = ko.utils.uniqueId('ks-popover-');
                ko.utils.domData.set(element, popoverDomDataTemplateKey, id);
                
                // place template rendering after popover is shown, because we don't have root element for template before that
                // and set event handling only at first time
                $element.on('shown.bs.popover', function () {
                    ko.renderTemplate(template, data, {}, document.getElementById(id)); 
                });
            }

            options.content = '<div id="' + id + '" ></div>';
            options.html = true;
        }

        var popoverData = $element.data('bs.popover');

        if (!popoverData) {
            $element.popover(options);
        } else {
            ko.utils.extend(popoverData.options, options);
        }
    }
};