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

    it('Should remove boundary links after property changes', function () {
        var vm = {
            value: { currentPage: ko.observable(1), totalCount: ko.observable(20), boundary: ko.observable(true) }
        };

        ko.applyBindings(vm, this.testElement[0]);

        expect(this.testElement).toContainElement('.ks-boundary-first');
        expect(this.testElement).toContainElement('.ks-boundary-last');

        vm.value.boundary(false);

        expect(this.testElement).not.toContainElement('.ks-boundary-first');
        expect(this.testElement).not.toContainElement('.ks-boundary-last');
    });

    it('Should remove directions links after property changes', function () {
        var vm = {
            value: { currentPage: ko.observable(1), totalCount: ko.observable(20), directions: ko.observable(true) }
        };

        ko.applyBindings(vm, this.testElement[0]);

        expect(this.testElement).toContainElement('.ks-direction-back');
        expect(this.testElement).toContainElement('.ks-direction-forward');

        vm.value.directions(false);

        expect(this.testElement).not.toContainElement('.ks-direction-back');
        expect(this.testElement).not.toContainElement('.ks-direction-forward');
    });
});