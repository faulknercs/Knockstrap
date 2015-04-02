describe('Binding: pagination', function () {
    this.prepareTestElement('<div data-bind="pagination: value"></div>');

    it('Should add pagination widget', function () {
        var vm = {
            value: { currentPage: ko.observable(1), totalCount: ko.observable(20) }
        };

        ko.applyBindings(vm, this.testElement[0]);

        expect(this.testElement).not.toBeEmpty();
    });

    it('Should add pagination widget with first page selected', function () {
        var vm = {
            value: { currentPage: ko.observable(), totalCount: ko.observable(20) }
        };

        ko.applyBindings(vm, this.testElement[0]);

        expect(vm.value.currentPage()).toEqual(1);
        expect(this.testElement.find('.active')).toHaveText(1);
    });

    it('Should add pagination widget with second page selected', function () {
        var vm = {
            value: { currentPage: ko.observable(2), totalCount: ko.observable(20) }
        };

        ko.applyBindings(vm, this.testElement[0]);

        expect(vm.value.currentPage()).toEqual(2);
        expect(this.testElement.find('.active')).toHaveText(2);
    });

    it('Should change selected page after currenPage changes', function () {
        var vm = {
            value: { currentPage: ko.observable(1), totalCount: ko.observable(20) }
        };

        ko.applyBindings(vm, this.testElement[0]);

        expect(this.testElement.find('.active')).toHaveText(1);
        vm.value.currentPage(2);
        expect(this.testElement.find('.active')).toHaveText(2);
    });

    it('Should change currentPage property after click on page link', function () {
        var vm = {
            value: { currentPage: ko.observable(1), totalCount: ko.observable(20) }
        };

        ko.applyBindings(vm, this.testElement[0]);

        expect(vm.value.currentPage()).toEqual(1);
        this.testElement.find('.active + li > a').click();
        expect(vm.value.currentPage()).toEqual(2);
    });
});