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
}

function ExamplesViewModel() {
    var self = this;
    
    self.tooltipExample = new TooltipExampleViewModel();

    self.progress = ko.observable(20);

    self.modalExample = new ModalExampleViewModel();

    self.popoverExample = new PopoverExampleViewModel();

    self.alertExample = new AlertExampleViewModel();

    self.buttonsExample = new ButtonsExampleViewModel();
}

if (!ko.bindingHandlers.modal) {
    alert('You need build Knockstrap.js at first');
}

var vm = new ExamplesViewModel();
ko.applyBindings(vm);
