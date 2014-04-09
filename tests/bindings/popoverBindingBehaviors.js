describe('Binding: popover', function () {
    this.prepareTestElement('<div data-bind="popover: value">Test</div>');

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

    it('Should render template with passed template id', function(done) {
        var vm = {
            value: {
                options: { title: 'test', content: 'test' },
                template: 'test-template'
            }
        };

        this.testElement.after('<script id="test-template" type="text/html"><div id="test">Text</div></script>');

        ko.applyBindings(vm, this.testElement[0]);

        var el = this.testElement;
        this.testElement.on('shown.bs.popover', function () {
            expect(el.find('+ div #test').length).toEqual(1);
            done();

            $('#test-template').remove();
        });

        this.testElement.click();
    });
});