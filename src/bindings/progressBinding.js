ko.bindingHandlers.progress = {
    init: function (element, valueAccessor) {
        var $element = $(element),
            value = valueAccessor();

        var barWidth = ko.computed(function () {
            return ko.unwrap(value) + '%';
        });

        ko.renderTemplate('progress', { value: value, barWidth: barWidth }, { templateEngine: ko.stringTemplateEngine.instance }, element);

        $element.addClass('progress');

        return { controlsDescendantBindings: true };
    },
};
