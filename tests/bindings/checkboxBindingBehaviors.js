describe('Binding: checkbox', function () {
    describe('Array case', function () {
        this.prepareTestElement('<div class="btn-group form-group" data-toggle="buttons" data-bind="knockstrap.checkbox: value">'
            + '<label class="btn btn-primary"><input type="checkbox" value="A" />A</label>'
            + '<label class="btn btn-primary"><input type="checkbox" value="B" />B</label>'
            + '<label class="btn btn-primary"><input type="checkbox" value="C" />C</label>'
            + '</div>');

        function getValuesArray($elementsArray) {
            return $elementsArray.toArray().map(function (e) { return e.value; });
        }

        it('Should throw exception for non-array value', function () {
            var el = this.testElement[0];

            expect(function () {
                ko.applyBindings({ value: "A" }, el);
            }).toThrow();
        });

        it('Should not check any button, if init array is empty', function () {
            var vm = { value: ko.observableArray() };

            ko.applyBindings(vm, this.testElement[0]);

            expect(this.testElement.children()).not.toHaveClass('active');
            expect(this.testElement.find('input')).not.toBeChecked();
        });

        it('Should check button corresponding to the values, which are in array at init', function () {
            var vm = { value: ko.observableArray(['A', 'B']) };

            ko.applyBindings(vm, this.testElement[0]);

            expect(getValuesArray(this.testElement.find('.active input:checked'))).toEqual(['A', 'B']);
            expect(this.testElement.find('input:checked')).toHaveLength(2);
        });

        it('Should check buttons according to adding/removing values from array', function () {
            var vm = { value: ko.observableArray() };

            ko.applyBindings(vm, this.testElement[0]);

            vm.value.push('B');
            expect(getValuesArray(this.testElement.find('.active input:checked'))).toContain('B');

            vm.value.push('A');
            expect(getValuesArray(this.testElement.find('.active input:checked'))).toContain('A');

            vm.value.remove('B');
            expect(getValuesArray(this.testElement.find('.active input:checked'))).not.toContain('B');
        });

        it('Should add/remove values to array according to clicked buttons', function () {
            var vm = { value: ko.observableArray() };
            //need because of realization of binding
            jasmine.clock().install();

            ko.applyBindings(vm, this.testElement[0]);

            this.testElement.children().eq(0).click();
            jasmine.clock().tick(1);
            expect(vm.value()).toContain('A');

            this.testElement.children().eq(1).click();
            jasmine.clock().tick(1);
            expect(vm.value()).toContain('B');

            this.testElement.children().eq(0).click();
            jasmine.clock().tick(1);
            expect(vm.value()).not.toContain('A');
            expect(vm.value()).toContain('B');

            jasmine.clock().uninstall();
        });

        it('Should change array values according to clicked button for dynamically added checkboxes', function () {
            var vm = { value: ko.observableArray() };

            //need because of realization of binding
            jasmine.clock().install();

            ko.applyBindings(vm, this.testElement[0]);

            this.testElement.append('<label class="btn btn-primary"><input type="checkbox" name="options" value="D" />D</label>');

            this.testElement.children().eq(3).click();
            jasmine.clock().tick(1);
            expect(vm.value()).toContain('D');

            jasmine.clock().uninstall();
        });

        it('Should check dynamically added button according to array changes', function () {
            var vm = { value: ko.observableArray() };

            ko.applyBindings(vm, this.testElement[0]);

            this.testElement.append('<label class="btn btn-primary"><input type="checkbox" name="options" value="D" />D</label>');

            vm.value.push('D');
            expect(getValuesArray(this.testElement.find('.active input:checked'))).toContain('D');
        });
    });

    describe('Boolean case', function () {
        this.prepareTestElement('<div class="btn-group form-group" data-toggle="buttons">'
        + '<label class="btn btn-primary"><input type="checkbox" data-bind="knockstrap.checkbox: value" />A</label>'
        + '</div>');

        it('Should throw exception for non-observable value', function () {
            var el = this.testElement[0];

            expect(function () {
                ko.applyBindings({ value: true }, el);
            }).toThrow();
        });

        it('Should check button, for true init value', function () {
            var vm = { value: ko.observable(true) };

            ko.applyBindings(vm, this.testElement[0]);

            expect(this.testElement.children()).toHaveClass('active');
            expect(this.testElement.find('input')).toBeChecked();
        });

        it('Should check button according to value changes', function () {
            var vm = { value: ko.observable(true) };

            ko.applyBindings(vm, this.testElement[0]);

            vm.value(false);
            // checking 'active' class together with checked state of input
            expect(this.testElement).not.toContainElement('.active input:checked');
            vm.value(true);
            expect(this.testElement).toContainElement('.active input:checked');
        });

        it('Should change value according to button state', function () {
            var vm = { value: ko.observable() };
            //need because of realization of binding
            jasmine.clock().install();

            ko.applyBindings(vm, this.testElement[0]);

            this.testElement.children().eq(0).click();
            jasmine.clock().tick(1);
            expect(vm.value()).toBeTruthy();

            this.testElement.children().eq(0).click();
            jasmine.clock().tick(1);
            expect(vm.value()).toBeFalsy();

            jasmine.clock().uninstall();
        });

        it('Should uncheck button for any falthy value', function () {
            var vm = { value: ko.observable(true) };

            ko.applyBindings(vm, this.testElement[0]);

            vm.value(0);
            expect(this.testElement).not.toContainElement('.active input:checked');

            vm.value(true);
            vm.value('');
            expect(this.testElement).not.toContainElement('.active input:checked');

            vm.value(true);
            vm.value(null);
            expect(this.testElement).not.toContainElement('.active input:checked');

            vm.value(true);
            vm.value(undefined);
            expect(this.testElement).not.toContainElement('.active input:checked');
        });
    });
});