describe('Binding: carousel', function () {
    this.prepareTestElement('<div data-bind="carousel: value"></div>');

    beforeEach(function() {
        this.testElement.after('<script id="test-template" type="text/html"><div class="test-template" data-bind="text: label">Text</div></script>');
    });

    afterEach(function() {
        $('#test-template').remove();
    });

    var testData = [{
        src: 'testsrc-one',
        alt: 'First image',
        content: 'First caption'
    }, {
        src: 'testsrc-two',
        alt: 'Second image',
        content: 'Second caption'
    }];

    it('Should throw exception, if "content" is not passed', function() {
        var el = this.testElement[0];

        expect(function() {
            ko.applyBindings({}, el);
        }).toThrow();
    });
    
    it('Should create carousel with passed id', function () {
        var vm = {
            value: {
                id: 'test-id',
                content: { data: testData }
            }
        };

        ko.applyBindings(vm, this.testElement[0]);

        expect(this.testElement).toHaveId('test-id');
        // contrlos target
        expect(this.testElement.find('.carousel-control')).toHaveAttr('href', '#test-id');
        //indicators target
        expect(this.testElement.find('ol li')).toHaveData('target', '#test-id');
    });

    it('Should create carousel using id, specified via "id" attribute', function () {
        var vm = {
            value: {
                id: 'test-id-nonattr',
                content: { data: testData }
            }
        };

        this.testElement.attr('id', 'test-id');

        ko.applyBindings(vm, this.testElement[0]);

        expect(this.testElement).toHaveId('test-id');
        expect(this.testElement.find('.carousel-control')).toHaveAttr('href', '#test-id');
        expect(this.testElement.find('ol li')).toHaveData('target', '#test-id');
    });

    it('Should render carousel controls with passed template id and template data', function () {
        var vm = {
            value: {
                content: { data: testData },
                controls: { name: 'test-template', data: { label: 'test text' } }
            }
        };

        ko.applyBindings(vm, this.testElement[0]);

        expect(this.testElement).toContainElement('.test-template');
        expect(this.testElement.find('.test-template')).toHaveText('test text');
    });

    it('Should use "dataConverter" and pass binding value to it for controls template, when "data" was not specified', function () {
        var spy = jasmine.createSpy().and.callFake(function () {
                // for default template
                return { id: 'any' };
            }),
            vm = {
                value: {
                    content: { data: testData },
                    controls: { name: 'test-template', dataConverter: spy }
                }
            };

        ko.applyBindings(vm, this.testElement[0]);

        expect(spy).toHaveBeenCalledWith(vm.value);
    });

    it('Should not use "dataConverter" for controls template, if "data" was passed', function () {
        var spy = jasmine.createSpy(),
            vm = {
            value: {
                content: { data: testData },
                controls: { name: 'test-template', data: { label: 'test text' }, dataConverter: spy }
            }
        };

        ko.applyBindings(vm, this.testElement[0]);

        expect(spy).not.toHaveBeenCalled();
    });
});