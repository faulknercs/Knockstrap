// Knockout doesn't allow to use 'css: className' and 'css: { 'class-name': boolValue }' bindings on same element
// This binding can be used together with 'css: { 'class-name': boolValue }'
// Inspired by https://github.com/knockout/knockout/wiki/Bindings---class
var previousClassKey = '__ko__previousClassValue__';

ko.bindingHandlers['class'] = {
    update: function (element, valueAccessor) {
        if (element[previousClassKey]) {
            ko.utils.toggleDomNodeCssClass(element, element[previousClassKey], false);
        }
        
        var value = ko.unwrap(valueAccessor());
        ko.utils.toggleDomNodeCssClass(element, value, true);
        element[previousClassKey] = value;
    }
};