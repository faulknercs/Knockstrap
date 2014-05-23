describe('String Template Engine', function () {
    this.prepareTestElement('<div data-bind="template: templ"></div>');

    beforeEach(function() {
        this.engine = new ko.stringTemplateEngine();
    });

    it('Should "ko.stringTemplateEngine.instance" exist and be an instanse of ko.stringTemplateEngine', function() {
        expect(ko.stringTemplateEngine.instance).toBeDefined();
        expect(ko.stringTemplateEngine.instance).toEqual(jasmine.any(ko.stringTemplateEngine));
    });

    it('Should add new string template to string template engine', function() {
        this.engine.addTemplate('test', '<span>text<span>');

        expect(this.engine.isTemplateExist('test')).toBeTruthy();
    });
    
    it('Should remove template from template engine', function () {
        this.engine.addTemplate('test', '<span>text<span>');

        expect(this.engine.isTemplateExist('test')).toBeTruthy();
        this.engine.removeTemplate('test');
        expect(this.engine.isTemplateExist('test')).toBeFalsy();
    });
    
    it('Should render element with added string template', function () {
        this.engine.addTemplate('test', '<span>test text<span>');

        var vm = {
            templ: { name: 'test', templateEngine: this.engine }
        };

        ko.applyBindings(vm, this.testElement[0]);

        expect(this.testElement).toContainText('test text');
    });

    it('Should not render element with string template engine', function () {
        this.engine.addTemplate('test', '<span>string template engine<span>');
        this.testElement.after('<script id="test" type="text/html"><span>native template engine<span></script>');

        var vm = {
            templ: { name: 'test' }
        };

        ko.applyBindings(vm, this.testElement[0]);

        expect(this.testElement).not.toContainText('string template engine');
        $('#test-template').remove();
    });

    it('Should throw exception, if trying to remove template without name', function () {
        expect(function() {
            this.engine.removeTemplate();
        }).toThrow();
    });
    
    it('Should throw exception, if trying to add undefined template', function () {
        expect(function () {
            this.engine.addTemplate('test');
        }).toThrow();
    });
});