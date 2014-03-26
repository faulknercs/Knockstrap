// Knockout checked binding doesn't work with Bootstrap checkboxes
ko.bindingHandlers.checkbox = {
    init: function (element, valueAccessor) {
        var $element = $(element),
            handler = function (e) {
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

        if ($element.attr('data-toggle') === 'buttons' && $element.find('input:checkbox').length) {
            $element.on('change', 'input:checkbox', handler);
        } else if ($element.attr('type') === 'checkbox') {
            $element.on('change', handler);
        } else {
            throw new Error('checkbox binding should be used only with bootstrap checkboxes');
        }
    },

    update: function (element, valueAccessor) {
        var $element = $(element),
            value = ko.unwrap(valueAccessor());

        if (value instanceof Array) {
            if ($element.attr('data-toggle') === 'buttons') {
                $element.find('input:checkbox').each(function (index, el) {
                    $(el).parent().toggleClass('active', value.indexOf(el.value) !== -1);
                });
            } else {
                $element.toggleClass('active', value.indexOf($element.val()) !== -1);
            }
        } else {
            $element.parent().toggleClass('active', !!value);
        }
    }
};