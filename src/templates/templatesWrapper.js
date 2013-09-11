// inspired by http://www.knockmeout.net/2011/10/ko-13-preview-part-3-template-sources.html
ko.stringTemplateEngine = function () {
    var templates = {},
        templateEngine = new ko.nativeTemplateEngine();

    // @include compiledTemplates.js
    
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

    templateEngine.makeTemplateSource = function (template) {
        return new ko.templateSources.stringTemplate(template);
    };

    templateEngine.addTemplate = function(name, body) {
        templates[name] = body;
    };

    return templateEngine;
};

ko.stringTemplateEngine.instance = new ko.stringTemplateEngine();
