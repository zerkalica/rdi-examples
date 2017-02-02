'use strict';

exports.__esModule = true;
exports.default = undefined;

var _class;

var _annotations = require('reactive-di/annotations');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NavTheme = (0, _annotations.theme)(_class = function NavTheme() {
    _classCallCheck(this, NavTheme);

    this.__css = {
        statusWrapper: {
            composes: ['float-xs-right']
        },
        wrapper: {
            composes: ['navbar', 'navbar-light', 'bg-faded']
        },
        block: {
            composes: ['nav', 'navbar-nav']
        },
        active: {
            composes: ['nav-item', 'active']
        },
        link: {
            composes: ['nav-link']
        }
    };
}) || _class;

exports.default = NavTheme;
//# sourceMappingURL=NavTheme.js.map