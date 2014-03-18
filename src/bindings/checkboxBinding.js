// Knockout checked binding doesn't work with Bootstrap checkboxes
ko.bindingHandlers.checkbox = {
    init: function (element, valueAccessor) {
        var $element = $(element);

        // todo: add checking compatibility of element with binding

        var handler = function (e) {
            // we need to handle change event after bootsrap will handle its event
            // to prevent incorrect changing of checkbox state
            setTimeout(function() {
                var $checkbox = $(e.target),
                    value = valueAccessor(),
                    data = $checkbox.val(),
                    isChecked = $checkbox.parent().hasClass('active');

                if (ko.unwrap(value) instanceof Array) {
                    var index = ko.unwrap(value).indexOf(data);

                    if (isChecked && (index === -1)) {
                        value.push(data);
                    } else if (!isChecked && (index !== -1)) {
                        value.splice(index, 1);
                    }
                } else {
                    value(isChecked);
                }
            }, 0);
        };

        if ($element.attr('data-toggle') === 'buttons' && $element.find('input[type=checkbox]').length) {
            $element.on('change', 'input:checkbox', handler);
        } else if ($element.attr('type') === 'checkbox') {
            $element.on('change', handler);
        }
    },

    update: function (element, valueAccessor) {
        var $element = $(element),
            value = ko.unwrap(valueAccessor());

        if (value instanceof Array) {
            if ($element.attr('buttons')) {
                $element.each(function (index, el) {
                    $(el).toggleClass('active', value.indexOf(el.value) !== -1);
                });
            } else {
                $element.toggleClass('active', value.indexOf($element.val()) !== -1);
            }
        } else {
            $element.parent().toggleClass('active', !!value);
        }
    }
};