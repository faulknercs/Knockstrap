// @echo header
(function (factory) {
    'use strict';
    
    if (typeof ko !== undefined && typeof jQuery !== undefined) {
        //global knockout and jQuery references already present, so use these regardless of whether this module has been included in CommonJS/AMD
        factory(ko, jQuery);
    } else if (typeof require === 'function' && typeof exports === 'object' && typeof module === 'object') {
        // CommonJS/Node.js
        factory(require('knockout'), require('jquery'));
    } else if (typeof define === 'function' && define.amd) {
        // AMD
        define(['knockout', 'jquery'], factory);
    } else {
        throw new Error('Could not locate current context reference to knockout and jQuery in order to load Knockstrap');
    }

})(function (ko, $) {
    'use strict';
    
    // @include utils.js

    // @include templates.js

    // @include bindings.js
});
