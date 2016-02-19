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
                
                if(!$checkbox.prop('disbled')) {
                    if (ko.unwrap(value) instanceof Array) {
                        var index = ko.utils.arrayIndexOf(ko.unwrap(value), (data));

                        if (isChecked && (index === -1)) {
                            value.push(data);
                        } else if (!isChecked && (index !== -1)) {
                            value.splice(index, 1);
                        }
                    } else {
                        value(isChecked);
                    }
                }
            }, 0);
        };

        if ($element.attr('data-toggle') === 'buttons' && $element.find('input:checkbox').length) {

            if (!(ko.unwrap(valueAccessor()) instanceof Array)) {
                throw new Error('checkbox binding should be used only with array or observableArray values in this case');
            }

            $element.on('change', 'input:checkbox', handler);
        } else if ($element.attr('type') === 'checkbox') {

            if (!ko.isObservable(valueAccessor())) {
                throw new Error('checkbox binding should be used only with observable values in this case');
            }

            $element.on('change', handler);
        } else {
            throw new Error('checkbox binding should be used only with bootstrap checkboxes');
        }
    },

    update: function (element, valueAccessor) {
        var $element = $(element),
            value = ko.unwrap(valueAccessor()),
            isChecked;

        if (value instanceof Array) {
            if ($element.attr('data-toggle') === 'buttons') {
                $element.find('input:checkbox').each(function (index, el) {
                    isChecked = ko.utils.arrayIndexOf(value, el.value) !== -1;
                    $(el).parent().toggleClass('active', isChecked);
                    el.checked = isChecked;
                });
            } else {
                isChecked = ko.utils.arrayIndexOf(value, $element.val()) !== -1;
                $element.toggleClass('active', isChecked);
                $element.find('input').prop('checked', isChecked);
            }
        } else {
            isChecked = !!value;
            $element.prop('checked', isChecked);
            $element.parent().toggleClass('active', isChecked);
        }
    }
};