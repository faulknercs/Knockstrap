// Knockout checked binding doesn't work with Bootstrap radio-buttons
ko.bindingHandlers.radio = {
    init: function (element, valueAccessor) {
        var $element = $(element),
            radioButtons = $element.find('input[type="radio"]');

        radioButtons.on('change', function(e) {
            var radio = $(e.target),
                value = valueAccessor(),
                newValue = radio.val();

            value(newValue);
        });
        
        return;
    },

    update: function (element, valueAccessor) {
        var value = valueAccessor(),
            radioButton = $(element).find('input[value="' + value + '"]');

        radioButton.parent().siblings().removeClass('active');
        radioButton.addClass('active');
    }
};