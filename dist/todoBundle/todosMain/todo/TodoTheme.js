'use strict';

exports.__esModule = true;
exports.default = undefined;

var _class;

var _annotations = require('reactive-di/annotations');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TodoTheme = (0, _annotations.theme)(_class = function TodoTheme() {
    _classCallCheck(this, TodoTheme);

    this.__css = {
        wrapper: {
            composes: ['input-group']
        },
        completed: {
            composes: ['input-group-addon']
        },
        editingTitle: {
            composes: ['form-control']
        },
        beginEdit: {
            composes: ['form-control', 'btn', 'btn-secondary'],
            textAlign: 'left',
            overflow: 'hidden'
        },
        commitEdit: {
            composes: ['btn', 'btn-primary']
        },
        cancelEdit: {
            composes: ['btn', 'btn-secondary']
        },
        deleteTodo: {
            composes: ['btn', 'btn-danger']
        },
        deleteIcon: {
            composes: ['fa', 'fa-trash-o']
        },
        okIcon: {
            composes: ['fa', 'fa-check-square']
        },
        cancelIcon: {
            composes: ['fa', 'fa-ban']
        },
        id: {
            composes: ['input-group-addon'],
            width: '50px',
            overflow: 'hidden',
            paddingLeft: '3px',
            fontSize: '80%'
        }
    };
}) || _class;

exports.default = TodoTheme;
//# sourceMappingURL=TodoTheme.js.map