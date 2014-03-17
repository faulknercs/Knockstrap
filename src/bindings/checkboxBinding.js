// Knockout checked binding doesn't work with Bootstrap checkboxes
ko.bindingHandlers.checkbox = {
    init: function (element, valueAccessor) {
        var $element = $(element);

        // todo: add checking compatibility of element with binding

        var handler = function(e) {
            var $checkbox = $(e.target),
                value = valueAccessor(),
                data = $checkbox.val(),
                isChecked = $checkbox.is(':checked');

            if (ko.unwrap(value) instanceof Array) {
                var index = ko.unwrap(value).indexOf(data);

                if (isChecked && (index < 0)) {
                    value.push(data);
                } else if(!isChecked && (index >= 0)) {
                    value.splice(index, 1);
                }
            } else {
                value(isChecked);
            }
        };

        if ($element.attr('data-toggle') === 'buttons' && $element.find('input[type=checkbox]').length) {
            $element.on('change', 'input:checkbox', handler);
        } else if ($element.attr('type') === 'checkbox') {
            $element.on('change', handler);
        }
    },

    update: function (element, valueAccessor) {
        var $element = $(element),
            value = valueAccessor();

        if (ko.unwrap(value) instanceof Array) {
            
        } else {
            $element.parent().toggleClass('active');
        }
    }
};