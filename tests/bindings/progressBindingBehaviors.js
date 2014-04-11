describe('Binding: progress', function() {
    this.prepareTestElement('<div data-bind="progress: value"></div>');

    it('Should add "progress" class to target element', function() {
        ko.applyBindings({ value: 1 }, this.testElement[0]);

        expect(this.testElement).toHaveClass('progress');
    });

    it('Should add width in percents and aria-valuenow attr according to value to progress-bar', function () {
        
        ko.applyBindings({ value: 20 }, this.testElement[0]);

        // need, because if element is visible, jQuery calculate its width in pixels
        // see http://stackoverflow.com/a/19873744 for details
        this.testElement.hide();
        
        expect(this.testElement.find('.progress-bar')).toHaveCss({ width: '20%' });
        expect(this.testElement.find('.progress-bar')).toHaveAttr('aria-valuenow', '20');
    });

    it('Should change width and aria-valuenow attr according to value changes', function () {
        var vm = {
            value: ko.observable(20)
        };

        ko.applyBindings(vm, this.testElement[0]);

        this.testElement.hide();
        vm.value(30);

        expect(this.testElement.find('.progress-bar')).toHaveCss({ width: '30%' });
        expect(this.testElement.find('.progress-bar')).toHaveAttr('aria-valuenow', '30');
    });

    it('Should throw exception for not Number value', function () {

        var el = this.testElement[0];
                
        expect(function() {
            ko.applyBindings({ value: "stringVal" }, el);
        }).toThrow();
    });
});