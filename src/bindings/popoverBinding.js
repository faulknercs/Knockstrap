var popoverDomDataTemplateKey = '__popoverTemplateKey__',
    popoverDomDataEventHandlerKey = '__popoverEventHandlerKey__';

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

    update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        var $element = $(element),
            value = ko.unwrap(valueAccessor()),
            options = (!value.options && !value.template ? ko.utils.unwrapProperties(value) : ko.utils.unwrapProperties(value.options)) || {};

        if (value.template) {
            // use unwrap to local var to track dependency from template, if it is observable
            var template = ko.unwrap(value.template),
                id = ko.utils.domData.get(element, popoverDomDataTemplateKey),
                data = ko.unwrap(value.data);
                
            if (!id) {
                id = ko.utils.uniqueId('ks-popover-');
                ko.utils.domData.set(element, popoverDomDataTemplateKey, id);
            }

            // remove old handler, to use updated values
            $element.off('shown.bs.popover', ko.utils.domData.get(element, popoverDomDataEventHandlerKey));

            var renderPopoverTemplate = function () {
                ko.renderTemplate(template, bindingContext.createChildContext(data), {}, document.getElementById(id));
                
                // bootstrap's popover calculates position before template renders,
                // so we recalculate position, using bootstrap methods
                var $popover = $('#' + id).parents('.popover'),
                    popoverMethods = $element.data('bs.popover'),
                    offset = popoverMethods.getCalculatedOffset(options.placement || 'right', popoverMethods.getPosition(), $popover.outerWidth(), $popover.outerHeight());

                popoverMethods.applyPlacement(offset, options.placement || 'right');
            };
            
            // place template rendering after popover is shown, because we don't have root element for template before that
            $element.on('shown.bs.popover', renderPopoverTemplate);
            ko.utils.domData.set(element, popoverDomDataEventHandlerKey, renderPopoverTemplate);

            options.content = '<div id="' + id + '" ></div>';
            options.html = true;
            
            // support rerendering of template, if observable changes, when popover is opened
            if ($(id).is(':visible')) {
                renderPopoverTemplate();
            }
        }

        var popoverData = $element.data('bs.popover');

        if (!popoverData) {
            $element.popover(options);
        } else {
            ko.utils.extend(popoverData.options, options);
        }
    }
};