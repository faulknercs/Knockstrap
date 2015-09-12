ko.bindingHandlers.pagination = {
    defaults: {
        maxPages: 5,

        pageSize: 10,

        directions: true,

        boundary: true,

        text: {
            first: 'First',
            last: 'Last',
            back: '&laquo;',
            forward: '&raquo;'
        }
    },

    init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        var value = $.extend(true, {}, ko.bindingHandlers.pagination.defaults, valueAccessor());

        if (!ko.isObservable(value.currentPage)) {
            throw new TypeError('currentPage should be observable');
        }
        
        if (!$.isNumeric(value.currentPage())) {
            value.currentPage(1);
        }

        var model = new Pagination(value);

        ko.renderTemplate('pagination', bindingContext.createChildContext(model), { templateEngine: ko.stringTemplateEngine.instance }, element);

        return { controlsDescendantBindings: true };
    }
};

ko.bindingHandlers.pager = {
    defaults: {
        pageSize: 10,

        text: {
            back: '&larr;',
            forward: '&rarr;'
        }
    },

    init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        var value = $.extend(true, {}, ko.bindingHandlers.pager.defaults, valueAccessor());

        if (!ko.isObservable(value.currentPage)) {
            throw new TypeError('currentPage should be observable');
        }

        if (!$.isNumeric(value.currentPage())) {
            value.currentPage(1);
        }

        var model = new Pager(value);

        ko.renderTemplate('pager', bindingContext.createChildContext(model), { templateEngine: ko.stringTemplateEngine.instance }, element);

        return { controlsDescendantBindings: true };
    }
};

function Pager(data) {
    var self = this;
    
    self.isAligned = data.isAligned;
    
    self.currentPage = data.currentPage;

    self.totalCount = data.totalCount;

    self.pageSize = data.pageSize;

    self.text = data.text;

    self.pagesCount = ko.computed(function () {
        var total = ko.unwrap(self.totalCount),
            pageSize = ko.unwrap(self.pageSize);

        return Math.ceil(total / pageSize);
    });

    self.isBackDisabled = ko.computed(function () {
        return self.currentPage() === 1;
    });

    self.isForwardDisabled = ko.computed(function () {
        return self.currentPage() === self.pagesCount();
    });

    self.goBack = function() {
        if (self.isBackDisabled()) {
            return;
        }

        var current = self.currentPage();
        self.currentPage(current - 1);
    };

    self.goForward = function() {
        if (self.isForwardDisabled()) {
            return;
        }

        var current = self.currentPage();
        self.currentPage(current + 1);
    };
}

function Pagination(data) {
    var self = this;

    Pager.call(self, data);

    var getStartPage = function () {
        var maxPages = +ko.unwrap(self.maxPages);

        return ((Math.ceil(self.currentPage() / maxPages) - 1) * maxPages) + 1;
    };

    var getLastPage = function (startPage) {
        var maxPages = +ko.unwrap(self.maxPages);

        return Math.min(startPage + maxPages - 1, self.pagesCount());
    };

    self.maxPages = data.maxPages;

    self.boundary = data.boundary;

    self.directions = data.directions;

    self.text = data.text;

    self.pages = ko.computed(function () {
        var pages = [];

        var startPage = getStartPage(),
            endPage = getLastPage(startPage);

        for (var pageNumber = startPage; pageNumber <= endPage; pageNumber++) {
            pages.push(new Page(pageNumber, pageNumber, pageNumber === self.currentPage()));
        }

        if (startPage > 1) {
            pages.unshift(new Page(startPage - 1, '...'));
        }

        if (endPage < self.pagesCount()) {
            pages.push(new Page(endPage + 1, '...'));
        }

        return pages;
    });

    self.selectPage = function (page) {
        self.currentPage(page.number);
    };

    self.goFirst = function() {
        if (self.isBackDisabled()) {
            return;
        }

        self.currentPage(1);
    };
    
    self.goLast = function () {
        if (self.isForwardDisabled()) {
            return;
        }

        self.currentPage(self.pagesCount());
    };
}

// page model
function Page(number, text, isActive) {
    this.number = number;

    this.text = text || number;

    this.isActive = !!isActive;
}