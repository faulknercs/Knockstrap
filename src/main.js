// @echo header
(function (factory) {
    'use strict';

    if (typeof require === 'function' && typeof exports === 'object' && typeof module === 'object') {
        // CommonJS/Node.js
        factory(require('knockout'), require('jquery'));
    } else if (typeof define === 'function' && define.amd) {
        // AMD
        define(['knockout', 'jquery'], factory);
    } else {
        factory(ko, $);
    }

})(function (ko, $) {
    'use strict';
    
    // @include utils.js

    // @include templates.js

    // @include bindings.js
});
