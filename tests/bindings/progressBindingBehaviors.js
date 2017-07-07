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

    it('Should throw exception for not Number value or for Object without Number property "value"', function () {

        var el = this.testElement[0];
                
        expect(function() {
            ko.applyBindings({ value: "stringVal" }, el);
        }).toThrow();
    });
    
    it('Should add "active" class, when animated property is set to true', function () {
        var vm = {
            value: {
                value: ko.observable(20),
                animated: ko.observable(false)
            }
        };

        ko.applyBindings(vm, this.testElement[0]);

        expect(this.testElement.find('.progress-bar')).not.toHaveClass('active');
        vm.value.animated(true);
        expect(this.testElement.find('.progress-bar')).toHaveClass('active');
    });
    
    it('Should add "progress-bar-striped" class, when striped property is set to true', function () {
        var vm = {
            value: {
                value: ko.observable(20),
                striped: ko.observable(false)
            }
        };

        ko.applyBindings(vm, this.testElement[0]);

        expect(this.testElement.find('.progress-bar')).not.toHaveClass('progress-bar-striped');
        vm.value.striped(true);
        expect(this.testElement.find('.progress-bar')).toHaveClass('progress-bar-striped');
    });
    
    it('Should add "sr-only" class to span, when textHidden property is set to true', function () {
        var vm = {
            value: {
                value: ko.observable(20),
                textHidden: ko.observable(false)
            }
        };

        ko.applyBindings(vm, this.testElement[0]);

        expect(this.testElement.find('.progress-bar > span')).not.toHaveClass('sr-only');
        vm.value.textHidden(true);
        expect(this.testElement.find('.progress-bar > span')).toHaveClass('sr-only');
    });
    
    it('Should update text in sapn according to changes at model', function () {
        var vm = {
            value: {
                value: ko.observable(20),
                text: ko.observable('Test')
            }
        };

        ko.applyBindings(vm, this.testElement[0]);

        expect(this.testElement.find('.progress-bar span:last')).toContainText('Test');
        vm.value.text('Updated');
        expect(this.testElement.find('.progress-bar span:last')).toContainText('Updated');
    });
    
    it('Should render progress bar with class according to given type', function () {
        var vm = {
            value: {
                value: ko.observable(20),
                type: ko.observable('info')
            }
        };

        ko.applyBindings(vm, this.testElement[0]);

        expect(this.testElement.find('.progress-bar')).toHaveClass('progress-bar-info');
    });
    
    it('Should change progress bar type class according to changes of type property', function () {
        var vm = {
            value: {
                value: ko.observable(20),
                type: ko.observable('info')
            }
        };

        ko.applyBindings(vm, this.testElement[0]);

        vm.value.type('danger');
        expect(this.testElement.find('.progress-bar')).toHaveClass('progress-bar-danger');
        vm.value.type('custom');
        expect(this.testElement.find('.progress-bar')).toHaveClass('progress-bar-custom');
    });

    it('Should add multiple stacked progress bars if array passed', function() {
        var vm = {
            value: [{
                value: ko.observable(20),
                type: ko.observable('info')
            }, {
                value: ko.observable(40),
                type: ko.observable('danger')
            }]
        };

        ko.applyBindings(vm, this.testElement[0]);

        expect(this.testElement.find('.progress-bar')).toHaveLength(2);
    });
});