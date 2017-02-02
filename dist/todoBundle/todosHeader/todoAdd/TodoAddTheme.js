'use strict';

exports.__esModule = true;
exports.default = undefined;

var _class;

var _annotations = require('reactive-di/annotations');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TodoAddTheme = (0, _annotations.theme)(_class = function TodoAddTheme() {
    _classCallCheck(this, TodoAddTheme);

    this.__css = {
        group: {
            composes: ['input-group']
        },
        ctl: {
            composes: ['form-control']
        },
        toggleAll: {
            composes: ['input-group-addon', 'btn', 'btn-link'],
            fontWeight: 'bold'
        },
        togleAllIcon: {
            composes: ['fa', 'fa-angle-down']
        },
        submit: {
            composes: ['btn', 'btn-success']
        },
        error: {
            width: '100%'
        },
        addIcon: {
            composes: ['fa', 'fa-plus-square']
        }
    };
}) || _class;

exports.default = TodoAddTheme;
//# sourceMappingURL=TodoAddTheme.js.map