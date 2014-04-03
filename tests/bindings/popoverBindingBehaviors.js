describe('Binding: popover', function () {
    this.prepareTestElement('<div data-bind="popover: value"></div>');

    it('Should call popover method on creation and pass to it value, when value doesn\'t contain options property', function () {
        var vm = {
            value: { title: 'test', content: 'test' }
        };

        spyOn($.fn, 'popover');
        ko.applyBindings(vm, this.testElement[0]);

        expect($.fn.popover).toHaveBeenCalledWith(vm.value);
    });

    it('Should call popover method on creation and pass to it options, when value contains options property', function() {
        var vm = {
            value: {
                options: { title: 'test', content: 'test' }
            }
        };

        spyOn($.fn, 'popover');
        ko.applyBindings(vm, this.testElement[0]);

        expect($.fn.popover).toHaveBeenCalledWith(vm.value.options);
    });
    
    it('Should extend popover data after options update instead of calling popover again', function () {
        var vm = {
            value: { title: ko.observable('test') }
        };

        ko.applyBindings(vm, this.testElement[0]);
        spyOn($.fn, 'popover');
        vm.value.title('changed text');

        expect($.fn.popover).not.toHaveBeenCalled();
        expect(this.testElement.data('bs.popover').options.title).toEqual(vm.value.title());
    });
});