describe('Binding: progress', function() {
    this.prepareTestElement();

    it('Should add "progress" class to element', function() {
        this.testElement.append('<div data-bind="progress: val"></div>');
        ko.applyBindings({ val: 1 }, this.testElement[0]);

        expect(this.testElement.children().eq(0).hasClass('progress')).toBe(true);
    });
});