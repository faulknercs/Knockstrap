describe('Binding: toggle', function () {
    this.prepareTestElement('<button data-toggle="button" data-bind="toggle: value">toggle</button>');

    it('Shoud throw exception for non-observable value', function() {
        var el = this.testElement[0];

        expect(function () {
            ko.applyBindings({ value: true }, el);
        }).toThrow();
    });

    it('Should has "active" class at button, if created with "true" init value', function() {
        var vm = { value: ko.observable(true) };

        ko.applyBindings(vm, this.testElement[0]);

        expect(this.testElement.hasClass('active')).toBe(true);
    });

    it('Should hasn\'t "active" class, if created with "false" init value', function() {
        var vm = { value: ko.observable(false) };

        ko.applyBindings(vm, this.testElement[0]);

        expect(this.testElement.hasClass('active')).toBe(false);
    });

    it('Should toggle "active" class, when value changes', function() {
        var vm = { value: ko.observable(false) };

        ko.applyBindings(vm, this.testElement[0]);

        expect(this.testElement.hasClass('active')).toBe(false);
        vm.value(true);
        expect(this.testElement.hasClass('active')).toBe(true);
        vm.value(false);
        expect(this.testElement.hasClass('active')).toBe(false);
    });

    it('Should toggle value, when element was clicked', function() {
        var vm = { value: ko.observable(false) };

        ko.applyBindings(vm, this.testElement[0]);
        
        this.testElement.click();
        expect(vm.value()).toBe(true);
        this.testElement.click();
        expect(vm.value()).toBe(false);
    });
});