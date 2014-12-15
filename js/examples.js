function TooltipExampleViewModel() {
    this.title = ko.observable('Observable title');
    this.placement = ko.observable('left');
}

function ModalExampleViewModel() {

    var self = this;

    var firstTemplateData = {
        text: 'First template',
        label: ko.observable('Observable label')
    };

    var secondTemplateData = {
        text: 'Second template',
        simpleLabel: 'Simple text label'
    };

    self.modalVisible = ko.observable(false);

    self.show = function() {
        self.modalVisible(true);
    };

    self.headerLabel = ko.observable('Some header text');
    self.bodyTemplate = ko.observable('firstModalTemplate');
    self.bodyData = ko.computed(function() {
        return self.bodyTemplate() === 'firstModalTemplate' ? firstTemplateData : secondTemplateData;
    });

    self.okText = ko.observable();

    self.switchTemplates = function() {
        self.bodyTemplate() === 'firstModalTemplate' ? self.bodyTemplate('secondModalTemplate') : self.bodyTemplate('firstModalTemplate');
    };

    self.modalSize = ko.observable('modal-lg');
}

function PopoverExampleViewModel() {
    var self = this;
    
    self.popoverTemplate = ko.observable('firstPopoverTemplate');
    self.switchTemplates = function() {
        self.popoverTemplate() === 'firstPopoverTemplate' ? self.popoverTemplate('secondPopoverTemplate') : self.popoverTemplate('firstPopoverTemplate');
    };
}

function AlertExampleViewModel() {
    var self = this;

    self.type = ko.observable('info');
    
    self.message = ko.observable('Alert message');
}

function ButtonsExampleViewModel() {
    var self = this;

    self.isToggled = ko.observable(false);

    self.radioValue = ko.observable();

    self.checkboxArray = ko.observableArray();

    self.checkboxValueA = ko.observable(true);
    
    self.checkboxValueB = ko.observable(false);
}

function CarouselExampleViewModel() {
    var self = this;

    self.itemsFirst = ko.observableArray([
        {
            src: 'holder.js/900x200/text:First image',
            alt: 'First image',
            content: 'First caption'
        }, {
            src: 'holder.js/900x200/text:Second image',
            alt: 'Second image',
            content: 'Second caption'
        }, {
            src: 'holder.js/900x200/text:Third image',
            alt: 'Third image',
            content: 'Third caption'
        }
    ]);

    self.itemsSecond = ko.observableArray([
        {
            src: 'holder.js/900x270/text:First image',
            alt: 'First image',
            primary: 'First caption',
            secondary: 'First subcaption'
        }, {
            src: 'holder.js/900x270/text:Second image',
            alt: 'Second image',
            primary: 'Second caption',
            secondary: 'Second subcaption'
        }, {
            src: 'holder.js/900x270/text:Third image',
            alt: 'Third image',
            primary: 'Third caption',
            secondary: 'Third subcaption'
        }
    ]);
}

function ProgressExampleViewModel() {

    this.value = ko.observable(50);

    this.animated = ko.observable();

    this.striped = ko.observable();

    this.type = ko.observable('info');

    this.text = ko.observable('Complete');

    this.textHidden = ko.observable(true);
    
    // for number as modal
    this.progress = ko.observable(20);
}

function ExamplesViewModel() {
    var self = this;
    
    self.tooltipExample = new TooltipExampleViewModel();

    self.progressExample = new ProgressExampleViewModel();

    self.modalExample = new ModalExampleViewModel();

    self.popoverExample = new PopoverExampleViewModel();

    self.alertExample = new AlertExampleViewModel();

    self.buttonsExample = new ButtonsExampleViewModel();

    self.carouselExample = new CarouselExampleViewModel();
    
    var ste = ko.stringTemplateEngine.instance;
    
    ste.addTemplate('demo', '<span>It\'s a <strong>string template engine</strong>!</span>');
}

if (!ko.bindingHandlers.modal) {
    alert('You need build Knockstrap.js at first');
}

var vm = new ExamplesViewModel();
ko.applyBindings(vm);
