(function (moduleName, factory) {
    'use strict';

    // TODO: write amd wrapper;

    if (typeof require === 'function' && typeof module !== 'undefined' && exports) {
        // CommonJS/Node.js
        //module.exports = 
    } else if (typeof define === 'function' && define.amd) {
        // AMD
        define(moduleName, ['knockout', 'jQuery'], factory);
    } else {
        factory(ko, $);
    }

})('knockstrap', function (ko, $) {
    // @include utils.js

    // @include templates.js

    // @include bindings.js
});