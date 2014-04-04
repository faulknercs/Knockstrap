// @echo header
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
    'use strict';
    
    // @include utils.js

    // @include templates.js

    // @include bindings.js
});