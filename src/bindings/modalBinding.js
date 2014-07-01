ko.bindingHandlers.modal = {
    defaults: {
        headerTemplate: {
            name: 'modalHeader'
        },

        bodyTemplate: {
            name: 'modalBody'
        },

        footerTemplate: {
            name: 'modalFooter',
            data: {
                closeLabel: 'Close',
                primaryLabel: 'Ok'
            }
        }
    },

    init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        var $element = $(element),
            value = ko.unwrap(valueAccessor()),
            defaults = ko.bindingHandlers.modal.defaults,
            options = ko.utils.extend({ show: $element.data().show }, ko.utils.unwrapProperties(value.options));

        if (!value.header || !value.body) {
            throw new Error('header and body options are required for modal binding.');
        }

        // fix for not working escape button
        if (options.keyboard || typeof options.keyboard === 'undefined') {
            $element.attr('tabindex', -1);
        }

        var model = {
            headerTemplate: $.extend(true, { templateEngine: !value.header.name ? ko.stringTemplateEngine.instance : null }, defaults.headerTemplate, value.header),
            bodyTemplate: $.extend(true, { templateEngine: !value.body.name ? ko.stringTemplateEngine.instance : null }, defaults.bodyTemplate, value.body),
            footerTemplate: null
        };

        if (value.footer) {
            model.footerTemplate = $.extend(true, { templateEngine: !value.footer.name ? ko.stringTemplateEngine.instance : null }, defaults.footerTemplate, value.footer);
        }

        ko.renderTemplate('modal', bindingContext.createChildContext(model), { templateEngine: ko.stringTemplateEngine.instance }, element);

        $element.addClass('modal fade').attr('role', 'dialog');
        $element.modal(options);

        $element.on('shown.bs.modal', function () {
            value.visible(true);
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
        var value = ko.unwrap(valueAccessor());

        $(element).modal(!ko.unwrap(value.visible) ? 'hide' : 'show');
    }
};