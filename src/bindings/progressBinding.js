ko.bindingHandlers.progress = {
    defaults: {
        css: 'progress',
        text: '',
        textHidden: true,
        striped: false,
        type: '',
        animated: false
    },

    init: function (element, valueAccessor) {
        var $element = $(element),
            value = valueAccessor(),
            unwrappedValue = ko.unwrap(value),
            defs = ko.bindingHandlers.progress.defaults,
            model = $.extend({}, defs, unwrappedValue);

        if (typeof unwrappedValue === 'number') {
            model.value = value;

            model.barWidth = ko.computed(function() {
                return ko.unwrap(value) + '%';
            });
        } else if (typeof ko.unwrap(unwrappedValue.value) === 'number') {
            model.barWidth = ko.computed(function() {
                return ko.unwrap(unwrappedValue.value) + '%';
            });
        } else {
            throw new Error('progress binding can accept only numbers or objects with "value" number propertie');
        }

        model.barType = ko.computed(function () {
            var type = ko.unwrap(model.type);
            
            return type ? 'progress-bar-' + type : '';
        });

        ko.renderTemplate('progress', model, { templateEngine: ko.stringTemplateEngine.instance }, element);

        $element.addClass(defs.css);

        return { controlsDescendantBindings: true };
    },
};
