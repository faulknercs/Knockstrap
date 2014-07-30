// inspired by http://www.knockmeout.net/2011/10/ko-13-preview-part-3-template-sources.html
(function () {
    // storage of string templates for all instances of stringTemplateEngine
    var templates = {};

    // @include compiledTemplates.js

    // create new template source to provide storing string templates in storage
    ko.templateSources.stringTemplate = function (template) {
        this.templateName = template;

        this.data = function (key, value) {
            templates.data = templates.data || {};
            templates.data[this.templateName] = templates.data[this.templateName] || {};

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

    ko.stringTemplateEngine.prototype.getTemplate = function (name) {
        return templates[name];
    };

    ko.stringTemplateEngine.prototype.addTemplate = function (name, template) {
        if (arguments.length < 2) {
            throw new Error('template is not provided');
        }
        
        templates[name] = template;
    };
    
    ko.stringTemplateEngine.prototype.removeTemplate = function (name) {
        if (!name) {
            throw new Error('template name is not provided');
        }

        delete templates[name];
    };
    
    ko.stringTemplateEngine.prototype.isTemplateExist = function (name) {
        return !!templates[name];
    };
    
    ko.stringTemplateEngine.instance = new ko.stringTemplateEngine();
})();
