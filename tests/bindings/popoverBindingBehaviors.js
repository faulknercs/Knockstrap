describe('Binding: popover', function () {
    this.prepareTestElement('<div data-bind="popover: value">Test</div>');

    afterEach(function() {
        $('.popover').remove();
    });

    it('Should add popover to element when value is popover options', function () {
        var vm = {
            value: { title: 'title', content: 'test' }
        };

        ko.applyBindings(vm, this.testElement[0]);
        this.testElement.click();

        expect($('.popover')).toExist();
        expect($('.popover')).toContainText('test');
    });

    it('Should add popover to element when value contains options object', function () {
        var vm = {
            value: {
                options: { title: 'title', content: 'test' }
            }
        };

        ko.applyBindings(vm, this.testElement[0]);
        this.testElement.click();

        expect($('.popover')).toExist();
        expect($('.popover')).toContainText('test');
    });

    
    it('Should update popover according to changes of observables', function () {
        var vm = {
            value: { title: ko.observable('test') }
        };

        ko.applyBindings(vm, this.testElement[0]);
        vm.value.title('new text');
        this.testElement.click();

        expect($('.popover')).toContainText('new text');
    });

    it('Should render template with passed template id and data', function(done) {
        var vm = {
            value: {
                options: { title: 'test', content: 'test' },
                template: 'test-template',
                data: { testText: 'test data' }
            }
        };

        this.testElement.after('<script id="test-template" type="text/html"><div id="test" data-bind="text: testText"></div></script>');

        ko.applyBindings(vm, this.testElement[0]);

        // content renders only after popover shown fully
        this.testElement.on('shown.bs.popover', function () {
            expect($('.popover')).toContainElement('#test');
            expect($('.popover')).toContainText('test data');

            done();

            $('#test-template').remove();
        });

        this.testElement.click();
    });
});