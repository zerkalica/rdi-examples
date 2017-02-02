'use strict';

exports.__esModule = true;
exports.default = undefined;

var _class;

var _annotations = require('reactive-di/annotations');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TodosFooterTheme = (0, _annotations.theme)(_class = function () {
    function TodosFooterTheme() {
        _classCallCheck(this, TodosFooterTheme);

        this.__css = {
            footer: {
                padding: '0.3em 0',
                textAlign: 'center'
            },
            todoCount: {
                padding: '0.5rem 1rem',
                vertcalAlign: 'middle',
                display: 'inline-block',
                float: 'left',
                textAlign: 'left'
            },
            list: {
                padding: 0,
                listStyle: 'none',
                position: 'absolute',
                right: 0,
                left: 0
            },
            listItem: {
                display: 'inline'
            },
            activeLink: {
                composes: ['btn', 'btn-primary']
            },
            normalLink: {
                composes: ['btn', 'btn-link']
            },
            clearCompleted: {
                composes: ['btn', 'btn-secondary'],
                float: 'right',
                position: 'relative'
            }
        };
    }

    TodosFooterTheme.prototype.link = function link(isActive) {
        return isActive ? this.activeLink : this.normalLink;
    };

    return TodosFooterTheme;
}()) || _class;

exports.default = TodosFooterTheme;
//# sourceMappingURL=TodosFooterTheme.js.map