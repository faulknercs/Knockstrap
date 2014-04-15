describe('Binding: carousel', function () {
    this.prepareTestElement('<div data-bind="carousel: value"></div>');

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
    });
});