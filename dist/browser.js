'use strict';

require('./wpFixes');

var _common = require('node-config-loader/common');

var _browser = require('../modules/rdi-bootstrap/browser');

var _browser2 = _interopRequireDefault(_browser);

var _index = require('../modules/rdi-ui-common/index');

var _modules = require('./modules');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pn = document.location.pathname;
// import staticConfig from 'rdi-config/.configloaderrc'

/* eslint-env browser */

var values = (0, _common.merge)([{
    RouterConfig: {
        isFull: false,
        prefix: pn.substring(0, pn.length - 1),
        routes: _modules.routes
    }
},
// staticConfig,
window['rdi-todo'] || {}]);

(0, _browser2.default)({
    window: window,
    ErrorPage: _index.ErrorPage,
    FallbackPage: _index.FallbackPage,
    elementId: 'app',
    values: values,
    rdi: _modules.rdi,
    pages: _modules.pages
})();
//# sourceMappingURL=browser.js.map