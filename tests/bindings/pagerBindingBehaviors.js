describe('Binding: pager', function () {
    this.prepareTestElement('<div data-bind="pager: value"></div>');

    it('Should add pager widget', function () {
        var vm = {
            value: { currentPage: ko.observable(1), totalCount: ko.observable(20) }
        };

        ko.applyBindings(vm, this.testElement[0]);

        expect(this.testElement).not.toBeEmpty();
    });

    it('Should add pager widget with first page selected', function () {
        var vm = {
            value: { currentPage: ko.observable(), totalCount: ko.observable(20) }
        };

        ko.applyBindings(vm, this.testElement[0]);

        expect(vm.value.currentPage()).toEqual(1);
    });

    it('Should add css classes for aligned state', function () {
        var vm = {
            value: { currentPage: ko.observable(1), totalCount: ko.observable(30), isAligned: true }
        };

        ko.applyBindings(vm, this.testElement[0]);

        expect(this.testElement.find('li:first')).toHaveClass('previous');
        expect(this.testElement.find('li:last')).toHaveClass('next');
    });
    
    it('Should go to next page after next button click', function () {
        var vm = {
            value: { currentPage: ko.observable(1), totalCount: ko.observable(200) }
        };

        ko.applyBindings(vm, this.testElement[0]);

        this.testElement.find('li:last > a').click();

        expect(vm.value.currentPage()).toEqual(2);
    });
    
    it('Should go to previous page after back button click', function () {
        var vm = {
            value: { currentPage: ko.observable(3), totalCount: ko.observable(200) }
        };

        ko.applyBindings(vm, this.testElement[0]);

        this.testElement.find('li:first > a').click();

        expect(vm.value.currentPage()).toEqual(2);
    });
});