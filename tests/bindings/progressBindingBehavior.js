describe('Binding: progress', function() {
    this.prepareTestElement('<div data-bind="progress: value"></div>');

    it('Should add "progress" class to target element', function() {
        ko.applyBindings({ value: 1 }, this.testElement[0]);

        expect(this.testElement.hasClass('progress')).toBe(true);
    });

    it('Should add width in percents and aria-valuenow attr according to value to progress-bar', function() {
        ko.applyBindings({ value: 20 }, this.testElement[0]);
        
        expect(parseInt(this.testElement.find('.progress-bar')[0].style.width)).toEqual(20);
        expect(+this.testElement.find('.progress-bar').attr('aria-valuenow')).toEqual(20);
    });

    it('Should change width and aria-valuenow attr according to value changes', function () {
        var vm = {
            value: ko.observable(20)
        };

        ko.applyBindings(vm, this.testElement[0]);

        vm.value(30);

        expect(parseInt(this.testElement.find('.progress-bar')[0].style.width)).toEqual(30);
        expect(+this.testElement.find('.progress-bar').attr('aria-valuenow')).toEqual(30);
    });

    it('Should throw exception for not Number value', function () {

        var el = this.testElement[0];
                
        expect(function() {
            ko.applyBindings({ value: "stringVal" }, el);
        }).toThrow();
    });
});