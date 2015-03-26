ko.bindingHandlers.pagination = {
    defaults: {
        maxPages: 5,
        boundaryText: {
            first: 'First',
            lasr: 'Last'
        },

        directionsText: {
            back: '&laquo;',
            forward: '&raquo;'
        }
    },

    init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        var value = valueAccessor();

        var model = new Pagination(value);

        ko.renderTemplate('pagination', bindingContext.createChildContext(model), { templateEngine: ko.stringTemplateEngine.instance }, element);

        return { controlsDescendantBindings: true };
    },

    //update: function (element, valueAccessor) {
        
    //}
};

function Pagination(data, options) {
    var self = this;

    var startPage = function() {
        
    };

    var lastPage = function() {

    };

    self.current = ko.observable();

    self.totalCount = ko.observable();

    self.pageSize = ko.observable();

    self.maxPages = ko.observable();

    self.pagesCount = ko.computed(function() {
        return Math.ceil(self.totalCount() / self.pageSize());
    });

    self.pages = ko.computed(function() {
        var count = Math.min(self.maxPages(), self.pagesCount()),
            pages = [];

        for (var i = 0; i < count; i++) {
            
        }

        return pages;
    });

    self.boundary = false;

    self.directions = false;

    self.isBackDisabled = ko.computed(function() {

    });

    self.isEnabledDisabled = ko.computed(function () {

    });
}