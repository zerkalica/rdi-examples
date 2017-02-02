'use strict';

exports.__esModule = true;
exports.default = undefined;

var _class;

var _annotations = require('reactive-di/annotations');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TodosTheme = (0, _annotations.theme)(_class = function TodosTheme() {
    _classCallCheck(this, TodosTheme);

    this.__css = {
        wrapper: {
            margin: 0,
            padding: 0,
            listStyle: 'none'
        },
        item: {
            display: 'block',
            padding: '0.3em 0'
        }
    };
}) || _class;

exports.default = TodosTheme;
//# sourceMappingURL=TodosTheme.js.map