ko.bindingHandlers.modal = {
    defaults: {
        css: 'modal fade',
        attributes: {
            role: 'dialog'  
        },

        headerTemplate: {
            name: 'modalHeader',
            templateEngine: ko.stringTemplateEngine.instance
        },

        bodyTemplate: {
            name: 'modalBody',
            templateEngine: ko.stringTemplateEngine.instance
        },

        footerTemplate: {
            name: 'modalFooter',
            templateEngine: ko.stringTemplateEngine.instance,
            data: {
                closeLabel: 'Close',
                primaryLabel: 'Ok'
            }
        }
    },

    init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        var $element = $(element),
            value = valueAccessor(),
            defaults = ko.bindingHandlers.modal.defaults,
            options = ko.utils.extend({ show: $element.data().show || false }, ko.utils.unwrapProperties(value.options)),
            extendDefaults = function (defs, val) {
                var extended = {
                    name: defs.name,
                    data: defs.data,
                };

                // reassign to not overwrite default content of data property
                extended = $.extend(true, {}, extended, val);
                if (!val || !val.name) {
                    extended.templateEngine = defs.templateEngine;
                }

                return extended;
            };

        if (!value.header || !value.body) {
            throw new Error('header and body options are required for modal binding.');
        }

        // fix for not working escape button
        if (options.keyboard || typeof options.keyboard === 'undefined') {
            $element.attr('tabindex', -1);
        }

        var model = {
            headerTemplate: extendDefaults(defaults.headerTemplate, ko.unwrap(value.header)),
            bodyTemplate: extendDefaults(defaults.bodyTemplate, ko.unwrap(value.body)),
            footerTemplate: value.footer ? extendDefaults(defaults.footerTemplate, ko.unwrap(value.footer)) : null
        };

        ko.renderTemplate('modal', bindingContext.createChildContext(model), { templateEngine: ko.stringTemplateEngine.instance }, element);

        $element.addClass(defaults.css).attr(defaults.attributes);
        $element.modal(options);

        $element.on('shown.bs.modal', function () {
            value.visible(true);
            $(this).find("[autofocus]:first").focus();
        });

        $element.on('hidden.bs.modal', function () {
            value.visible(false);
        });

        // if we need to show modal after initialization, we need also set visible property to true
        if (options.show) {
            value.visible(true);
        }

        return { controlsDescendantBindings: true };
    },

    update: function (element, valueAccessor) {
        var value = valueAccessor();

        $(element).modal(!ko.unwrap(value.visible) ? 'hide' : 'show');
    }
};