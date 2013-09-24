ko.bindingHandlers.alert = {
    init: function () {
        return { controlsDescendantBindings: true };
    },

    update: function (element, valueAccessor) {
        var value = valueAccessor(),
            usedTemplateEngine = !value.name ? ko.stringTemplateEngine.instance : null,
            name = ko.unwrap(value.name) || 'alert',

            data = value.data || {
                message: value.message,
                priority: ko.computed(function() {
                    return 'alert-' + ko.unwrap(value.priority);
                }),
                
                close: value.close || function () {
                    ko.virtualElements.emptyNode(element);
                }
            };


        ko.renderTemplate(name, data, ko.utils.extend({ templateEngine: usedTemplateEngine }, value.templateOptions), element);
    }
};

ko.virtualElements.allowedBindings.alert = true;