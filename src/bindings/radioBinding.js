// Knockout checked binding doesn't work with Bootstrap radio-buttons
ko.bindingHandlers.radio = {
    init: function (element, valueAccessor) {

        if (!ko.isObservable(valueAccessor())) {
            throw new Error('radio binding should be used only with observable values');
        }

        $(element).on('change', 'input:radio', function (e) {
            // we need to handle change event after bootsrap will handle its event
            // to prevent incorrect changing of radio button styles
            setTimeout(function() {
                var radio = $(e.target),
                    value = valueAccessor(),
                    newValue = radio.val();

                // we shouldn't change value for disables buttons
                if (!radio.prop('disabled')) {
                    value(newValue);
                }
            }, 0);
        });
    },

    update: function (element, valueAccessor) {
        var tempValue = ko.unwrap(valueAccessor()),
            value = tempValue !== null && tempValue !== undefined ? tempValue : '',
            $radioButton = $(element).find('input[value="' + value.toString().replace(/"/g, '\\"') + '"]'),
            $radioButtonWrapper;

        if ($radioButton.length) {
            $radioButtonWrapper = $radioButton.parent();

            $radioButtonWrapper.siblings().removeClass('active');
            $radioButtonWrapper.addClass('active');

            $radioButton.prop('checked', true);
        } else {
            $radioButtonWrapper = $(element).find('.active');
            $radioButtonWrapper.removeClass('active');
            $radioButtonWrapper.find('input').prop('checked', false);
        }
    }
};