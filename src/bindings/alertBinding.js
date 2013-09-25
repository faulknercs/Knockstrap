ko.bindingHandlers.alert = {
    init: function () {
        return { controlsDescendantBindings: true };
    },

    update: function (element, valueAccessor) {
        var value = valueAccessor(),
            usedTemplateEngine = !value.template ? ko.stringTemplateEngine.instance : null,
            template = ko.unwrap(value.template) || 'alert',

            data = value.data || {
                message: value.message,
                priority: ko.computed(function() {
                    return 'alert-' + ko.unwrap(value.priority);
                }),
                
                close: value.close || function () {
                    ko.virtualElements.emptyNode(element);
                }
            };


        ko.renderTemplate(template, data, ko.utils.extend({ templateEngine: usedTemplateEngine }, value.templateOptions), element);
    }
};

ko.virtualElements.allowedBindings.alert = true;