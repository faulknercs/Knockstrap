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

    it('Should close popover when template contains button with "data-dismiss" attribute and it was clicked', function (done) {
        var vm = {
            value: {
                options: { title: 'test', content: 'test' },
                template: 'test-template',
                data: { }
            }
        };

        this.testElement.after('<script id="test-template" type="text/html"><button class="close pull-right" data-dismiss="popover">×</button><div>test</div></script>');

        ko.applyBindings(vm, this.testElement[0]);

        var spyEvent = spyOnEvent(this.testElement, 'hide.bs.popover');

        // content renders only after popover shown fully
        this.testElement.on('shown.bs.popover', function () {
            expect($('.popover')).toExist();
            $('.popover [data-dismiss="popover"]').click();
            expect(spyEvent).toHaveBeenTriggered();

            done();

            $('#test-template').remove();
        });

        this.testElement.click();
    });

    it('Should render template with passed template id and data via object', function(done) {
        var vm = {
            value: {
                options: { title: 'test', content: 'test' },
                template: { name: 'test-template', data: { testText: 'test data' } }
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