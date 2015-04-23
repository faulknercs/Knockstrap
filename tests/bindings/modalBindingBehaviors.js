describe('Binding: modal', function () {
    this.prepareTestElement('<div data-bind="knockstrap.modal: value"></div>');

    beforeEach(function() {
        this.testElement.after('<script id="test-template" type="text/html"><div id="test">Text</div></script>');
    });

    afterEach(function() {
        $('#test-template').remove();
    });

    it('Should create visible modal for true init value for "visible" option', function (done) {
        var vm = {
            value: {
                visible: ko.observable(true),
                header: { data: { label: 'test' } },
                body: { name: 'test-template' },
                footer: { data: { action: function () { } } }
            }
        };
        
        ko.applyBindings(vm, this.testElement[0]);

        var el = this.testElement;

        // modal doesn't appears immediately, so check visibility after shown event
        this.testElement.on('shown.bs.modal', function() {
            expect(el).toBeVisible();
            
            // clean up, for some reasons, backdrop doesn't disappear, if modal was closed immediately after open (possible bootstrap bug)
            el.modal('hide');
            $('.modal-backdrop').remove();
            $('body').removeClass('modal-open');
            done();
        });
    });

    it('Should throw exception, if there is no "header" property in options', function() {
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
    
    it('Should throw exception, if there is no "body" property in options', function () {
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
    
    it('Should not render footer, if there is no "footer" property in options', function () {
        var vm = {
            value: {
                header: { data: { label: 'test' } },
                body: { name: 'test-template' },
            }
        };

        ko.applyBindings(vm, this.testElement[0]);

        expect(this.testElement).not.toContainElement('.modal-footer');
    });

    it('Should render default header with passed text', function () {
        var vm = {
            value: {
                header: { data: { label: 'test-header' } },
                body: { name: 'test-template' },
                footer: { data: { action: function () { } } }
            }
        };

        ko.applyBindings(vm, this.testElement[0]);

        expect(this.testElement).toContainText('test-header');
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

        expect(this.testElement).toContainElement('#test');
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

        expect(this.testElement.find('.modal-footer .btn-primary')).toContainText('primary');
        expect(this.testElement.find('.modal-footer .btn-default')).toContainText('close');
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

    it('Should render default footer only with close button, if action was not passed', function() {
        var vm = {
            value: {
                header: { data: { label: 'test' } },
                body: { name: 'test-template' },
                footer: {}
            }
        };

        ko.applyBindings(vm, this.testElement[0]);

        expect(this.testElement).not.toContainElement('.btn-primary');
        expect(this.testElement).toContainElement('.btn-default');
    });

    it('Should render footer with passed template', function () {
        var vm = {
            value: {
                header: { data: { label: 'test' } },
                body: { name: 'test-template' },
                footer: { name: 'test-template' }
            }
        };

        ko.applyBindings(vm, this.testElement[0]);

        expect(this.testElement).toContainElement('.modal-footer #test');
    });

    it('Should render header with passed template', function() {
        var vm = {
            value: {
                header: { name: 'test-template' },
                body: { name: 'test-template' },
                footer: { data: { action: function () { }, primaryLabel: 'primary', closeLabel: 'close' } }
            }
        };

        ko.applyBindings(vm, this.testElement[0]);
        
        expect(this.testElement).toContainElement('.modal-header #test');
    });
    
    it('Should render modal-dialog element with passed css classes', function () {
        var vm = {
            value: {
                dialogCss: 'test-class',
                header: { name: 'test-template' },
                body: { name: 'test-template' },
            }
        };

        ko.applyBindings(vm, this.testElement[0]);

        expect(this.testElement).toContainElement('.modal-dialog.test-class');
    });
});