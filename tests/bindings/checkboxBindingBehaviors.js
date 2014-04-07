describe('Binding: checkbox', function () {
    this.prepareTestElement('<div class="btn-group form-group" data-toggle="buttons" data-bind="checkbox: value">'
        + '<label class="btn btn-primary"><input type="checkbox" value="A" />A</label>'
        + '<label class="btn btn-primary"><input type="checkbox" value="B" />B</label>'
        + '</div>');

    it('Should throw exception for non-observable value', function () {
        var el = this.testElement[0];

        expect(function () {
            ko.applyBindings({ value: "A" }, el);
        }).toThrow();
    });
});