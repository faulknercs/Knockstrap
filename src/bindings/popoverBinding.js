var popoverDomDataTemplateKey = '__popoverTemplateKey__';

ko.bindingHandlers.popover = {

    init: function (element) {
        var $element = $(element);

        ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
            if ($element.data('bs.popover')) {
                $element.popover('destroy');
            }
        });
    },

    update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        var $element = $(element),
            value = ko.unwrap(valueAccessor()),
            options = (!value.options && !value.template ? ko.utils.unwrapProperties(value) : ko.utils.unwrapProperties(value.options)) || {};

        if (value.template) {
            // use unwrap to track dependency from template, if it is observable
            ko.unwrap(value.template);

            var id = ko.utils.domData.get(element, popoverDomDataTemplateKey);

            var renderPopoverTemplate = function (eventObject) {

                if (eventObject && eventObject.type === 'inserted') {
                       $element.off('shown.bs.popover');
                }
                
                var template = ko.unwrap(value.template),
                    internalModel;

                if(typeof template === 'string') {
                    internalModel = { 
                        $$popoverTemplate: $.extend({
                            name: value.template,
                            data: value.data
                        }, value.templateOptions) 
                    };

                } else {
                    internalModel = {
                        $$popoverTemplate: value.template 
                    };
                }
                
                var childContext = bindingContext.createChildContext(bindingContext.$rawData, null, function(context) {
                    ko.utils.extend(context, internalModel);
                });

                ko.applyBindingsToDescendants(childContext, document.getElementById(id));

                // bootstrap's popover calculates position before template renders,
                // so we recalculate position, using bootstrap methods
                var $popover = $('#' + id).parents('.popover'),
                    popoverMethods = $element.data('bs.popover'),
                    offset = popoverMethods.getCalculatedOffset(options.placement || 'right', popoverMethods.getPosition(), $popover.outerWidth(), $popover.outerHeight());

                popoverMethods.applyPlacement(offset, options.placement || 'right');
            };

            // if there is no generated id - popover executes first time for this element
            if (!id) {
                id = ko.utils.uniqueId('ks-popover-');
                ko.utils.domData.set(element, popoverDomDataTemplateKey, id);

                // place template rendering after popover is shown, because we don't have root element for template before that
                $element.on('shown.bs.popover inserted.bs.popover', renderPopoverTemplate);
            }

            options.content = '<div id="' + id + '" ><div data-bind="template: $$popoverTemplate"></div></div>';
            options.html = true;
        }

        var popoverData = $element.data('bs.popover');

        if (!popoverData) {
            $element.popover(options);

            $element.on('shown.bs.popover inserted.bs.popover', function () {
                (options.container ? $(options.container) : $element.parent()).one('click', '[data-dismiss="popover"]', function () {
                    $element.popover('hide');
                });
            });
        } else {
            ko.utils.extend(popoverData.options, options);
            if(popoverData.options.content) {
                $element.popover('show');
            } else {
                $element.popover('hide');
            }
        }
    }
};
