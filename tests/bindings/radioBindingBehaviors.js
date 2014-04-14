describe('Binding: radio', function () {
    this.prepareTestElement('<div class="btn-group form-group" data-toggle="buttons" data-bind="radio: value">'
        + '<label class="btn btn-primary"><input type="radio" name="options" value="A" />A</label>'
        + '<label class="btn btn-primary"><input type="radio" name="options" value="B" />B</label>'
        + '</div>');

    it('Should throw exception for non-observable value', function() {
        var el = this.testElement[0];

        expect(function () {
            ko.applyBindings({ value: "A" }, el);
        }).toThrow();
    });

    it('Should not check any button, if init value is not specified', function() {
        var vm = { value: ko.observable() };

        ko.applyBindings(vm, this.testElement[0]);

        expect(this.testElement.children()).not.toHaveClass('active');
        expect(this.testElement.find('input')).not.toBeChecked();
    });
    
    it('Should check button corresponding to the init value', function () {
        var vm = { value: ko.observable('A') };

        ko.applyBindings(vm, this.testElement[0]);

        expect(this.testElement.find('.active input:checked')).toHaveValue('A');
    });
    
    it('Should check button according to value changes', function () {
        var vm = { value: ko.observable('A') };

        ko.applyBindings(vm, this.testElement[0]);

        expect(this.testElement.find('.active input:checked')).toHaveValue('A');
        vm.value('B');
        expect(this.testElement.find('.active input:checked')).toHaveValue('B');
        vm.value('A');
        expect(this.testElement.find('.active input:checked')).toHaveValue('A');
    });
    
    it('Should change value according to clicked button', function () {
        var vm = { value: ko.observable() };
        //need because of realization of binding
        jasmine.clock().install();
        
        ko.applyBindings(vm, this.testElement[0]);

        this.testElement.children().eq(0).click();
        jasmine.clock().tick(1);
        expect(vm.value()).toEqual('A');

        this.testElement.children().eq(1).click();
        jasmine.clock().tick(1);
        expect(vm.value()).toEqual('B');
        
        jasmine.clock().uninstall();
    });
   
    it('Should uncheck all buttons, if no button has set value', function () {
        var vm = { value: ko.observable('A') };

        ko.applyBindings(vm, this.testElement[0]);

        vm.value('Z');

        expect(this.testElement.children()).not.toHaveClass('active');
        expect(this.testElement.find('input')).not.toBeChecked();
    });
    
    it('Should change value according to clicked button for dynamically added radiobuttons', function () {
        var vm = { value: ko.observable() };

        this.testElement.append('<label class="btn btn-primary"><input type="radio" name="options" value="C" />C</label>');

        //need because of realization of binding
        jasmine.clock().install();

        ko.applyBindings(vm, this.testElement[0]);

        this.testElement.children().eq(2).click();
        jasmine.clock().tick(1);
        expect(vm.value()).toEqual('C');
        
        jasmine.clock().uninstall();
    });
    
    it('Should check dynamically added button according to value changes', function () {
        var vm = { value: ko.observable() };

        this.testElement.append('<label class="btn btn-primary"><input type="radio" name="options" value="C" />C</label>');

        ko.applyBindings(vm, this.testElement[0]);
        vm.value('C');
        expect(this.testElement.find('.active input:checked')).toHaveValue('C');
    });
});