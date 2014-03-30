describe('Utils: uniqueId', function () {
    it('Should return different strings for each call', function () {
        expect(ko.utils.uniqueId()).not.toEqual(ko.utils.uniqueId());
    });

    it('Should return id starts with passed prefix', function() {
        expect(ko.utils.uniqueId('test-prefix')).toMatch(/^test-prefix/);
    });

    it('Should return separate number sequences for different prefixes', function() {
        var firstId = ko.utils.uniqueId('first'),
            secondId = ko.utils.uniqueId('second');

        // last symbols should be equal for different prefixes at this point
        expect(firstId[firstId.length - 1]).toEqual(secondId[secondId.length - 1]);
    });
});

describe('Utils: uwrapProperties', function() {
    it('Should return object with non-observable properties for objects with observables and non-observables', function() {
        var testObj = {
            observableString: ko.observable('observableStringProperty'),
            nonObservableString: 'stringProperty',
        };
            
        var unwrapped = ko.utils.unwrapProperties(testObj);

        expect(unwrapped.observableString).toEqual(ko.unwrap(testObj.observableString));
        expect(unwrapped.nonObservableString).toEqual(testObj.nonObservableString);
    });

    it('Should return passed argument without changing, if it is not object', function() {
        expect(ko.utils.unwrapProperties(42)).toEqual(jasmine.any(Number));
        expect(ko.utils.unwrapProperties('string')).toEqual(jasmine.any(String));
        expect(ko.utils.unwrapProperties(null)).toEqual(null);
        expect(ko.utils.unwrapProperties(undefined)).toEqual(undefined);
        expect(ko.utils.unwrapProperties(function() {})).toEqual(jasmine.any(Function));
    });
});