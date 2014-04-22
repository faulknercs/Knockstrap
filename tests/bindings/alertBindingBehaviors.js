describe('Binding: alert', function () {
    this.prepareTestElement('<div data-bind="alert: value"></div>');

    beforeEach(function () {
        this.testElement.after('<script id="test-template" type="text/html"><div class="test-template" data-bind="text: label">Text</div></script>');
    });

    afterEach(function () {
        $('#test-template').remove();
    });

    it('Should add "alert" class to target element', function () {
        var vm = {
            value: { message: '' }
        };

        ko.applyBindings(vm, this.testElement[0]);

        expect(this.testElement).toHaveClass('alert');
    });

    it('Should render alert with given message text', function() {
        var vm = {
            value: { message: 'test text' }  
        };

        ko.applyBindings(vm, this.testElement[0]);

        expect(this.testElement).toContainText('test text');
    });
    
    it('Should render alert with class according to given type', function () {
        var vm = {
            value: { message: 'text', type: 'info' }
        };

        ko.applyBindings(vm, this.testElement[0]);

        expect(this.testElement).toHaveClass('alert-info');
    });
    
    it('Should change alert type class according to changes of type property', function () {
        var vm = {
            value: { message: 'text', type: ko.observable('info') }
        };

        ko.applyBindings(vm, this.testElement[0]);

        vm.value.type('danger');
        expect(this.testElement).toHaveClass('alert-danger');
        vm.value.type('custom');
        expect(this.testElement).toHaveClass('alert-custom');
    });
    
    it('Should render alert with given template id and data', function () {
        var vm = {
            value: { template: 'test-template', data: { label: 'test text' } }
        };

        ko.applyBindings(vm, this.testElement[0]);

        expect(this.testElement).toContainElement('.test-template');
        expect(this.testElement.find('.test-template')).toContainText('test text');
    });
    
    it('Should change template values according to obsrvables changing', function () {
        var vm = {
            value: { template: 'test-template', data: { label: ko.observable('test text') } }
        };

        ko.applyBindings(vm, this.testElement[0]);

        expect(this.testElement.find('.test-template')).toContainText('test text');
        vm.value.data.label('new text');
        expect(this.testElement.find('.test-template')).toContainText('new text');
    });
    
    it('Should change template if template option changes', function () {
        var vm = {
            value: { template: ko.observable('test-template'), data: { label: 'test text' } }
        };

        this.testElement.after('<script id="test-template-2" type="text/html"><div class="test-template-2">Text</div></script>');

        ko.applyBindings(vm, this.testElement[0]);

        expect(this.testElement).toContainElement('.test-template');
        vm.value.template('test-template-2');
        expect(this.testElement).toContainElement('.test-template-2');
        
        $('#test-template-2').remove();
    });
    
    it('Should creates alert for virtual elements', function () {
        var vm = {
            value: { message: 'test text' }
        };

        // change test element to ko virtual elements for this spec
        this.testElement = this.testElement.removeAttr('data-bind').html('<!-- ko alert: value --><!-- /ko -->');

        ko.applyBindings(vm, this.testElement[0]);

        expect(this.testElement).toContainElement('.alert');
        expect(this.testElement).toContainText('test text');
    });
});