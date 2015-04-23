describe('Binding: class', function () {
    this.prepareTestElement('<div data-bind="knockstrap.class: value"></div>');
    
    it('Should add class to element', function () {
        var vm = {
            value: ko.observable('test'),
        };

        ko.applyBindings(vm, this.testElement[0]);

        expect(this.testElement).toHaveClass('test');
    });

    it('Should change class after model changes', function () {
        var vm = {
            value: ko.observable('test'),
        };

        ko.applyBindings(vm, this.testElement[0]);

        expect(this.testElement).toHaveClass('test');

        vm.value('test2');

        expect(this.testElement).not.toHaveClass('test');
        expect(this.testElement).toHaveClass('test2');
    });

    it('Should remove class when model is empty', function () {
        var vm = {
            value: ko.observable('test'),
        };

        ko.applyBindings(vm, this.testElement[0]);

        expect(this.testElement).toHaveClass('test');

        vm.value('');

        expect(this.testElement).not.toHaveClass('test');
    });

    it('Should add class list', function () {
        var vm = {
            value: ko.observable('test test2'),
        };

        ko.applyBindings(vm, this.testElement[0]);

        expect(this.testElement).toHaveClass('test');
        expect(this.testElement).toHaveClass('test2');
    });

    it('Should remove one class from list', function () {
        var vm = {
            value: ko.observable('test test2'),
        };

        ko.applyBindings(vm, this.testElement[0]);

        vm.value('test');

        expect(this.testElement).toHaveClass('test');
        expect(this.testElement).not.toHaveClass('test2');
    });
});