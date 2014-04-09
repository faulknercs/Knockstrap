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

});