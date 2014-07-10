ko.bindingHandlers.carousel = {

    defaults: {
        css: 'carousel slide',

        controlsTemplate: {
            name: 'carouselControls',
            templateEngine: ko.stringTemplateEngine.instance,
            dataConverter: function(value) {
                return {
                    id: ko.computed(function() {
                        return '#' + ko.unwrap(value.id);
                    })
                };
            }
        },
        
        indicatorsTemplate: {
            name: 'carouselIndicators',
            templateEngine: ko.stringTemplateEngine.instance,
            dataConverter: function(value) {
                return {
                    id: ko.computed(function() {
                        return '#' + ko.unwrap(value.id);
                    }),
                    
                    items: value.content.data
                };
            }
        }, 
        
        itemTemplate: {
            name: 'carouselContent',
            templateEngine: ko.stringTemplateEngine.instance,

            converter: function (item) {
                return item;
            }
        }
    },

    init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        var $element = $(element),
            value = valueAccessor(),
            defaults = ko.bindingHandlers.carousel.defaults,
            extendDefaults = function(defs, type) {
                var extended = {
                    name: defs.name,
                    data: (value[type] && (value[type].data || value[type].dataConverter && value[type].dataConverter(value))) || defs.dataConverter(value),
                };

                extended = $.extend(true, {}, extended, value[type]);
                if (!value[type] || !value[type].name) {
                    extended.templateEngine = defs.templateEngine;
                }

                return extended;
            };

        if (!value.content) {
            throw new Error('content option is required for carousel binding');
        }

        // get carousel id from 'id' attribute, or from binding options, or generate it
        if (element.id) {
            value.id = element.id;
        } else if (value.id) {
            element.id = ko.unwrap(value.id);
        } else {
            element.id = value.id = ko.utils.uniqueId('ks-carousel-');
        }

        var model = {
            id: value.id,
            controlsTemplate: extendDefaults(defaults.controlsTemplate, 'controls'),
            indicatorsTemplate: extendDefaults(defaults.indicatorsTemplate, 'indicators'),

            items: value.content.data,
            converter: value.content.converter || defaults.itemTemplate.converter,
            itemTemplateName: value.content.name || defaults.itemTemplate.name,
            templateEngine: !value.content.name ? defaults.itemTemplate.templateEngine : null,
            afterRender: value.content.afterRender,
            afterAdd: value.content.afterAdd,
            beforeRemove: value.content.beforeRemove
        };

        ko.renderTemplate('carousel', bindingContext.createChildContext(model), { templateEngine: ko.stringTemplateEngine.instance }, element);

        $element.addClass(defaults.css);

        return { controlsDescendantBindings: true };
    },

    update: function (element, valueAccessor) {
        var value = valueAccessor(),
            options = ko.unwrap(value.options);

        $(element).carousel(options);
    }
};