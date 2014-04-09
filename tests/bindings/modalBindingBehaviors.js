describe('Binding: modal', function () {
    this.prepareTestElement('<div data-bind="modal: value"></div>');

    beforeEach(function() {
        this.testElement.after('<script id="test-template" type="text/html"><div id="test">Text</div></script>');
    });

    afterEach(function() {
        $('#test-template').remove();
    });

    it('Should trow exception, if there is no "header" property in options', function() {
        var vm = {
            value: {
                body: { name: 'test-template' },
                footer: { data: { action: function () { } } }
            }
        };

        var el = this.testElement[0];

        expect(function() {
            ko.applyBindings(vm, el);
        }).toThrow();
    });
    
    it('Should trow exception, if there is no "body" property in options', function () {
        var vm = {
            value: {
                header: { data: { label: 'test' } },
                footer: { data: { action: function () { } } }
            }
        };

        var el = this.testElement[0];

        expect(function () {
            ko.applyBindings(vm, el);
        }).toThrow();
    });
    
    it('Should trow exception, if there is no "footer" property in options', function () {
        var vm = {
            value: {
                header: { data: { label: 'test' } },
                body: { name: 'test-template' },
            }
        };

        var el = this.testElement[0];

        expect(function () {
            ko.applyBindings(vm, el);
        }).toThrow();
    });

    it('Should render default header with passed text', function () {
        var vm = {
            value: {
                header: { data: { label: 'test' } },
                body: { name: 'test-template' },
                footer: { data: { action: function () { } } }
            }
        };

        ko.applyBindings(vm, this.testElement[0]);

        expect(this.testElement.find('h3').text()).toEqual('test');
    });
    
    it('Should render body with passed template', function () {
        var vm = {
            value: {
                header: { data: { label: 'test' } },
                body: { name: 'test-template' },
                footer: { data: { action: function () { } } }
            }
        };

        ko.applyBindings(vm, this.testElement[0]);

        expect(this.testElement.find('.modal-body #test').text()).toEqual('Text');
    });
    
    it('Should render default footer with passed text', function () {
        var vm = {
            value: {
                header: { data: { label: 'test' } },
                body: { name: 'test-template' },
                footer: { data: { action: function () { }, primaryLabel: 'primary', closeLabel: 'close' } }
            }
        };

        ko.applyBindings(vm, this.testElement[0]);

        expect(this.testElement.find('.modal-footer .btn-primary').text()).toEqual('primary');
        expect(this.testElement.find('.modal-footer .btn-default').text()).toEqual('close');
    });
    
    it('Should call passed action, when primary button was clicked in default footer template', function () {
        var spy = jasmine.createSpy(),
            vm = {
            value: {
                header: { data: { label: 'test' } },
                body: { name: 'test-template' },
                footer: { data: { action: spy  } }
            }
        };

        ko.applyBindings(vm, this.testElement[0]);
        this.testElement.find('.modal-footer .btn-primary').click();

        expect(spy).toHaveBeenCalled();
    });
});