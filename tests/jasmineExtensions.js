jasmine.Suite.prototype.prepareTestElement = function () {
    beforeEach(function() {
        this.testElement = $("<div></div>");
    });

    afterEach(function () {
        this.testElement.remove();
    });
};