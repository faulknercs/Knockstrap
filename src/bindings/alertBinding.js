ko.bindingHandlers.alert = {
    init: function () {
        return { controlsDescendantBindings: true };
    },

    update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        var $element = $(element),
            value = valueAccessor(),
            usedTemplateEngine = !value.template ? ko.stringTemplateEngine.instance : null,
            userTemplate = ko.unwrap(value.template) || 'alertInner',
            template, data;

        // for compatibility with ie8, use '1' and '8' values for node types
        if (element.nodeType === (typeof Node !== 'undefined' && Node.ELEMENT_NODE || 1)) {
            template = userTemplate;
            data = value.data || { message: value.message };
            if ($element.hasClass('alert-info')) {
                $element.removeClass('alert-info');
            }
            $element.addClass('alert fade in').addClass('alert-' + (ko.unwrap(value.type) || 'info'));
        } else if (element.nodeType === (typeof Node !== 'undefined' && Node.COMMENT_NODE || 8)) {
            template = 'alert';
            data = {
                innerTemplate: {
                    name: userTemplate ,
                    data: value.data || { message: value.message },
                    templateEngine: usedTemplateEngine
                },
                type: 'alert-' + (ko.unwrap(value.type) || 'info')
            };
        } else {
            throw new Error('alert binding should be used with dom elements or ko virtual elements');
        }

        ko.renderTemplate(template, bindingContext.createChildContext(data), ko.utils.extend({ templateEngine: usedTemplateEngine }, value.templateOptions), element);
    }
};

ko.virtualElements.allowedBindings.alert = true;
