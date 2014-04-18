describe('Binding: tooltip', function () {
    this.prepareTestElement('<div data-bind="tooltip: options">Text</div>');

    afterEach(function() {
        $('.tooltip').remove();
    });

    it('Should add tooltip to element', function() {
        var vm = {
            options: { title: 'test' }
        };

        ko.applyBindings(vm, this.testElement[0]);
        this.testElement.mouseover();

        expect($('.tooltip')).toExist();
    });

    it('Should update tooltip according to changes of observables', function() {
        var vm = {
            options: { title: ko.observable('test') }
        };

        ko.applyBindings(vm, this.testElement[0]);
        vm.options.title('new text');
        this.testElement.mouseover();

        expect($('.tooltip')).toContainText('new text');
    });
});