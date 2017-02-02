'use strict';

exports.__esModule = true;
exports.rdi = exports.routes = exports.pages = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _todoBundle = require('./todoBundle');

var _index = require('../modules/rdi-ui-common/index');

var pages = exports.pages = _extends({}, _todoBundle.pages);

var routes = exports.routes = _extends({}, _todoBundle.routes);

var aliases = [];

var rdi = exports.rdi = aliases.concat(_todoBundle.rdi, _index.rdi);
//# sourceMappingURL=modules.js.map