describe('Binding: tooltip', function () {
    this.prepareTestElement('<div data-bind="tooltip: options"></div>');

    it('Should call tooltip method on creation and pass to it options', function() {
        var vm = {
            options: { title: 'test', position: 'left' }
        };

        spyOn($.fn, 'tooltip');
        ko.applyBindings(vm, this.testElement[0]);

        expect($.fn.tooltip).toHaveBeenCalledWith(vm.options);
    });
    
    it('Should extend tooltip data after options update instead of calling tooltip', function () {
        var vm = {
            options: { title: ko.observable('test') }
        };
        
        ko.applyBindings(vm, this.testElement[0]);
        
        spyOn($.fn, 'tooltip');

        vm.options.title('changed text');
        
        expect($.fn.tooltip).not.toHaveBeenCalled();
        expect(this.testElement.data('bs.tooltip').options.title).toEqual(vm.options.title());
    });
});