// inspired by http://www.knockmeout.net/2011/10/ko-13-preview-part-3-template-sources.html
(function() {
    var templates = {};

    // @include compiledTemplates.js

    // create new template source to provide storing templates in strings
    ko.templateSources.stringTemplate = function (template) {
        this.templateName = template;

        this.data = function (key, value) {
            templates.data = this.templates.data || {};
            templates.data[this.templateName] = this.templates.data[this.templateName] || {};

            if (arguments.length === 1) {
                return templates.data[this.templateName][key];
            }

            templates.data[this.templateName][key] = value;
        };

        this.text = function (value) {
            if (arguments.length === 0) {
                return templates[this.templateName];
            }

            templates[this.templateName] = value;
        };
    };

    // create modified template engine, which uses new string template source
    ko.stringTemplateEngine = function () {
        this.allowTemplateRewriting = false;
    };

    ko.stringTemplateEngine.prototype = new ko.nativeTemplateEngine();
    ko.stringTemplateEngine.prototype.constructor = ko.stringTemplateEngine;
    
    ko.stringTemplateEngine.prototype.makeTemplateSource = function (template) {
        return new ko.templateSources.stringTemplate(template);
    };
})();

ko.stringTemplateEngine.instance = new ko.stringTemplateEngine();
