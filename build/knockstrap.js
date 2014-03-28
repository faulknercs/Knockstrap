/*! knockstrap 0.3.0 | (c) 2013 Artem Stepanyuk |  http://www.opensource.org/licenses/mit-license */

(function (moduleName, factory) {
    'use strict';

    if (typeof require === 'function' && typeof exports === 'object' && typeof module === 'object') {
        // CommonJS/Node.js
        factory(require('knockout'), require('jquery'));
    } else if (typeof define === 'function' && define.amd) {
        // AMD
        define(moduleName, ['knockout', 'jQuery'], factory);
    } else {
        factory(ko, $);
    }

})('knockstrap', function (ko, $) {
    ko.utils.uniqueId = (function () {
    
        var prefixesCounts = {
            'ks-unique-': 0
        };
    
        return function (prefix) {
            prefix = prefix || 'ks-unique-';
    
            if (!prefixesCounts[prefix]) {
                prefixesCounts[prefix] = 0;
            }
    
            return prefix + prefixesCounts[prefix]++;
        };
    })();
    ko.utils.unwrapProperties = function (wrappedProperies) {
        var options = {};
    
        ko.utils.objectForEach(wrappedProperies, function (propertyName, propertyValue) {
            options[propertyName] = ko.unwrap(propertyValue);
        });
    
        return options;
    };

    // inspired by http://www.knockmeout.net/2011/10/ko-13-preview-part-3-template-sources.html
    ko.stringTemplateEngine = function () {
        var templates = {},
            templateEngine = new ko.nativeTemplateEngine();
    
        templates.alert="<div class=\"alert alert-block fade in\" data-bind=\"css: type\"> <button class=\"close\" data-bind=\"click: close\" aria-hidden=\"true\">&times;</button> <p data-bind=\"text: message\"></p> </div>";
        templates.carousel="<!-- ko template: indicatorsTemplate --> <!-- /ko --> <div class=\"carousel-inner\"> <!-- ko foreach: items --> <div class=\"item\" data-bind=\"with: $parent.converter($data), css: { active: $index() == 0 }\"> <img data-bind=\"attr: { src: src, alt: alt }\"> <div class=\"container\"> <div class=\"carousel-caption\"> <!-- ko template: { name: $parents[1].itemTemplateName, data: $data, templateEngine: $parents[1].templateEngine } --> <!-- /ko --> </div> </div> </div> <!-- /ko --> </div> <!-- ko template: controlsTemplate --> <!-- /ko --> ";
        templates.carouselContent="<div data-bind=\"text: content\"></div>";
        templates.carouselControls="<a class=\"left carousel-control\" data-bind=\"attr: { href: id }\" data-slide=\"prev\"> <span class=\"icon-prev\"></span> </a> <a class=\"right carousel-control\" data-bind=\"attr: { href: id }\" data-slide=\"next\"> <span class=\"icon-next\"></span> </a>";
        templates.carouselIndicators="<ol class=\"carousel-indicators\" data-bind=\"foreach: items\"> <li data-bind=\"attr: { 'data-target': $parent.id, 'data-slide-to': $index }\"></li> </ol> ";
        templates.modal="<div class=\"modal-dialog\"> <div class=\"modal-content\"> <div class=\"modal-header\" data-bind=\"template: headerTemplate\"> </div> <div class=\"modal-body\" data-bind=\"template: bodyTemplate\"> </div> <div class=\"modal-footer\" data-bind=\"template: footerTemplate\"> </div> </div> </div>";
        templates.modalBody="<div data-bind=\"html: content\"> </div>";
        templates.modalFooter="<a href=\"#\" class=\"btn btn-primary\" data-bind=\"click: action, html: primaryLabel\"></a> <a href=\"#\" class=\"btn btn-default\" data-bind=\"html: closeLabel\" data-dismiss=\"modal\"></a>";
        templates.modalHeader="<button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;</button> <h3 data-bind=\"text: label\"></h3> ";
        templates.progress="<div class=\"progress-bar\" role=\"progressbar\" aria-valuemin=\"0\" aria-valuemax=\"100\" data-bind=\"style: { width: barWidth }, attr: { 'aria-valuenow' : value }\"> <span class=\"sr-only\"><span data-bind=\"text: value\"></span>% Complete</span> </div> ";
        
        
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
    

    ko.bindingHandlers.alert = {
        init: function () {
            return { controlsDescendantBindings: true };
        },
    
        update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            var value = valueAccessor(),
                usedTemplateEngine = !value.template ? ko.stringTemplateEngine.instance : null,
                template = ko.unwrap(value.template) || 'alert',
    
                data = value.data || {
                    message: value.message,
                    type: ko.computed(function() {
                        return 'alert-' + (ko.unwrap(value.type) || 'info');
                    }),
                    
                    close: value.close || function () {
                        ko.virtualElements.emptyNode(element);
                    }
                };
    
    
            ko.renderTemplate(template, bindingContext.createChildContext(data), ko.utils.extend({ templateEngine: usedTemplateEngine }, value.templateOptions), element);
        }
    };
    
    ko.virtualElements.allowedBindings.alert = true;
    ko.bindingHandlers.carousel = {
    
        defaults: {
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
                        data: value.data || (value[type] && value[type].dataConverter && value[type].dataConverter(value)) || defs.dataConverter(value),
    
                        templateEngine: ko.stringTemplateEngine.instance
                    };
    
                    $.extend(true, extended, value[type]);
                    if (!value[type] || !value[type].name) {
                        extended.templateEngine = ko.stringTemplateEngine.instance;
                    }
    
                    return extended;
                };
    
            if (!value.content) {
                throw new Error('content option is required for carousel binding');
            }
    
            element.id = element.id || ko.unwrap(value.id) || ko.utils.uniqueId('ks-carousel-');
            if (!value.id) {
                value.id = element.id;
            }
            
            var model = {
                id: value.id,
                controlsTemplate: extendDefaults(defaults.controlsTemplate, 'controls'),
                indicatorsTemplate: extendDefaults(defaults.indicatorsTemplate, 'indicators'),
    
                items: value.content.data,
                converter: value.content.converter ||defaults.itemTemplate.converter,
                itemTemplateName: value.content.name || defaults.itemTemplate.name,
                templateEngine: !value.content.name ? ko.stringTemplateEngine.instance : null
            };
    
            ko.renderTemplate('carousel', bindingContext.createChildContext(model), { templateEngine: ko.stringTemplateEngine.instance }, element);
    
            $element.addClass('carousel slide');
    
            return { controlsDescendantBindings: true };
        },
    
        update: function (element, valueAccessor) {
            var $element = $(element),
                value = valueAccessor(),
                options = ko.unwrap(value.options);
    
            $element.carousel(options);
        }
    };
    // Knockout checked binding doesn't work with Bootstrap checkboxes
    ko.bindingHandlers.checkbox = {
        init: function (element, valueAccessor) {
            var $element = $(element),
                handler = function (e) {
                // we need to handle change event after bootsrap will handle its event
                // to prevent incorrect changing of checkbox state
                setTimeout(function() {
                    var $checkbox = $(e.target),
                        value = valueAccessor(),
                        data = $checkbox.val(),
                        isChecked = $checkbox.parent().hasClass('active');
    
                    if (ko.unwrap(value) instanceof Array) {
                        var index = ko.unwrap(value).indexOf(data);
    
                        if (isChecked && (index === -1)) {
                            value.push(data);
                        } else if (!isChecked && (index !== -1)) {
                            value.splice(index, 1);
                        }
                    } else {
                        value(isChecked);
                    }
                }, 0);
            };
    
            if ($element.attr('data-toggle') === 'buttons' && $element.find('input:checkbox').length) {
                $element.on('change', 'input:checkbox', handler);
            } else if ($element.attr('type') === 'checkbox') {
                $element.on('change', handler);
            } else {
                throw new Error('checkbox binding should be used only with bootstrap checkboxes');
            }
        },
    
        update: function (element, valueAccessor) {
            var $element = $(element),
                value = ko.unwrap(valueAccessor());
    
            if (value instanceof Array) {
                if ($element.attr('data-toggle') === 'buttons') {
                    $element.find('input:checkbox').each(function (index, el) {
                        $(el).parent().toggleClass('active', value.indexOf(el.value) !== -1);
                    });
                } else {
                    $element.toggleClass('active', value.indexOf($element.val()) !== -1);
                }
            } else {
                $element.parent().toggleClass('active', !!value);
            }
        }
    };
    ko.bindingHandlers.modal = {
        defaults: {
            headerTemplate: {
                name: 'modalHeader'
            },
    
            bodyTemplate: {
                name: 'modalBody'
            },
    
            footerTemplate: {
                name: 'modalFooter',
                data: {
                    closeLabel: 'Close',
                    primaryLabel: 'Ok'
                }
            }
        },
    
        init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            var $element = $(element),
                value = ko.unwrap(valueAccessor()),
                defaults = ko.bindingHandlers.modal.defaults,
                options = ko.utils.extend({ show: false }, ko.utils.unwrapProperties(value.options));
    
            if (!value.header || !value.body || !value.footer) {
                throw new Error('header, body and footer options are required for modal binding.');
            }
    
            var model = {
                headerTemplate: $.extend(true, { templateEngine: !value.header.name ? ko.stringTemplateEngine.instance : null }, defaults.headerTemplate, value.header),
                bodyTemplate: $.extend(true, { templateEngine: !value.body.name ? ko.stringTemplateEngine.instance : null }, defaults.bodyTemplate, value.body),
                footerTemplate: $.extend(true, { templateEngine: !value.footer.name ? ko.stringTemplateEngine.instance : null }, defaults.footerTemplate, value.footer)
            };
            
            ko.renderTemplate('modal', bindingContext.createChildContext(model), { templateEngine: ko.stringTemplateEngine.instance }, element);
    
            $element.addClass('modal fade').attr('role', 'dialog');
            $element.modal(options);
    
            $element.on('shown.bs.modal', function () {
                value.visible(true);
            });
    
            $element.on('hidden.bs.modal', function () {
                value.visible(false);
            });
    
            return { controlsDescendantBindings: true };
        },
    
        update: function (element, valueAccessor) {
            var value = ko.unwrap(valueAccessor());
    
            $(element).modal(!ko.unwrap(value.visible) ? 'hide' : 'show');
        }
    };
    var popoverDomDataTemplateKey = '__popoverTemplateKey__',
        popoverDomDataEventHandlerKey = '__popoverEventHandlerKey__';
    
    ko.bindingHandlers.popover = {
    
        init: function (element) {
            var $element = $(element);
    
            ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
                if ($element.data('bs.popover')) {
                    $element.popover('destroy');
                }
            });
    
            return { controlsDescendantBindings: true };
        },
    
        update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            var $element = $(element),
                value = ko.unwrap(valueAccessor()),
                options = !value.options && !value.template ? ko.utils.unwrapProperties(value) : ko.utils.unwrapProperties(value.options);
    
            if (value.template) {
                // use unwrap to local var to track dependency from template, if it is observable
                var template = ko.unwrap(value.template),
                    id = ko.utils.domData.get(element, popoverDomDataTemplateKey),
                    data = ko.unwrap(value.data);
                    
                if (!id) {
                    id = ko.utils.uniqueId('ks-popover-');
                    ko.utils.domData.set(element, popoverDomDataTemplateKey, id);
                }
    
                // remove old handler, to use updated values
                $element.off('shown.bs.popover', ko.utils.domData.get(element, popoverDomDataEventHandlerKey));
    
                var renderPopoverTemplate = function () {
                    ko.renderTemplate(template, bindingContext.createChildContext(data), {}, document.getElementById(id));
                };
                
                // place template rendering after popover is shown, because we don't have root element for template before that
                $element.on('shown.bs.popover', renderPopoverTemplate);
                ko.utils.domData.set(element, popoverDomDataEventHandlerKey, renderPopoverTemplate);
    
                options.content = '<div id="' + id + '" ></div>';
                options.html = true;
                
                // support rerendering of template, if observable changes, when popover is opened
                if ($(id).is(':visible')) {
                    renderPopoverTemplate();
                }
            }
    
            var popoverData = $element.data('bs.popover');
    
            if (!popoverData) {
                $element.popover(options);
            } else {
                ko.utils.extend(popoverData.options, options);
            }
        }
    };
    ko.bindingHandlers.progress = {
        init: function (element, valueAccessor) {
            var $element = $(element),
                value = valueAccessor();
    
            var barWidth = ko.computed(function () {
                return ko.unwrap(value) + '%';
            });
    
            ko.renderTemplate('progress', { value: value, barWidth: barWidth }, { templateEngine: ko.stringTemplateEngine.instance }, element);
    
            $element.addClass('progress');
    
            return { controlsDescendantBindings: true };
        },
    };
    
    // Knockout checked binding doesn't work with Bootstrap radio-buttons
    ko.bindingHandlers.radio = {
        init: function (element, valueAccessor) {
            var $element = $(element);
    
            $element.on('change', 'input:radio', function (e) {
                // we need to handle change event after bootsrap will handle its event
                // to prevent incorrect changing of radio button styles
                setTimeout(function() {
                    var radio = $(e.target),
                        value = valueAccessor(),
                        newValue = radio.val();
    
                    value(newValue);
                }, 0);
            });
        },
    
        update: function (element, valueAccessor) {
            var radioButton = $(element).find('input[value="' + ko.unwrap(valueAccessor()) + '"]'),
                radioButtonWrapper = radioButton.parent();
    
            if (radioButton.length) {
                radioButtonWrapper.siblings().removeClass('active');
                radioButtonWrapper.addClass('active');
    
                radioButton[0].checked = true;
            }
        }
    };
    ko.bindingHandlers.toggle = {
        init: function (element, valueAccessor) {
            var value = valueAccessor();
    
            ko.utils.registerEventHandler(element, 'click', function() {
                var previousValue = ko.unwrap(value);
                value(!previousValue);
            });
        },
        
        update: function (element, valueAccessor) {
            ko.utils.toggleDomNodeCssClass(element, 'active', ko.unwrap(valueAccessor()));
        }
    };
    
    ko.bindingHandlers.tooltip = {
        init: function (element) {
            var $element = $(element);
    
            ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
                if ($element.data('bs.tooltip')) {
                    $element.tooltip('destroy');
                }
            });
        },
    
        update: function (element, valueAccessor) {
            var $element = $(element),
                value = ko.unwrap(valueAccessor()),
                options = ko.utils.unwrapProperties(value);
    
            var tooltipData = $element.data('bs.tooltip');
    
            if (!tooltipData) {
                $element.tooltip(options);
            } else {
                ko.utils.extend(tooltipData.options, options);
            }
        }
    };
    
});