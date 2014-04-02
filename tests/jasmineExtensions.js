jasmine.Suite.prototype.prepareTestElement = function (markup) {

    markup = markup || '<div></div>';

    beforeEach(function() {
        this.testElement = $(markup);
    });

    afterEach(function () {
        this.testElement.remove();
    });
};