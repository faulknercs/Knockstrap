ko.bindingHandlers.alert = {
    init: function (element, valueAccessor) {
        var $element = $(element),
            value = valueAccessor(),
            priority = 'alert-' + ko.unwrap(value.priority);

        $element.addClass('alert alert-block fade in ' + priority);

        return { controlsDescendantBindings: true };
    },

    update: function (element, valueAccessor) {
        var value = ko.utils.unwrapProperties(valueAccessor()),
            usedTemplateEngine = !value.name ? ko.stringTemplateEngine.instance : null,
            name = value.name || 'alert',
            data = value.data || {
               message: value.message, close: function () {
                   valueAccessor().visible(false);
               }
            };
        
        if (ko.unwrap(value.visible)) {
            ko.renderTemplate(name, data, ko.utils.extend({ templateEngine: usedTemplateEngine }, value.templateOptions), element);
        } else {
            ko.virtualElements.emptyNode(element);
        }
    }
};