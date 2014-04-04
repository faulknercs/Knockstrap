ko.bindingHandlers.progress = {
    init: function (element, valueAccessor) {
        var $element = $(element),
            value = valueAccessor();

        if (typeof ko.unwrap(value) !== 'number') {
            throw new Error('progress binding can accept only numbers');
        }

        var barWidth = ko.computed(function () {
            return ko.unwrap(value) + '%';
        });

        ko.renderTemplate('progress', { value: value, barWidth: barWidth }, { templateEngine: ko.stringTemplateEngine.instance }, element);

        $element.addClass('progress');

        return { controlsDescendantBindings: true };
    },
};
