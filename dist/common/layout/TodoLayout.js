'use strict';

exports.__esModule = true;
exports.default = TodoLayout;

var _reactiveDi = require('reactive-di');

var _index = require('../../../modules/rdi-ui-common/index');

var _NavView = require('../nav/NavView');

var _NavView2 = _interopRequireDefault(_NavView);

var _TodoLayoutTheme = require('./TodoLayoutTheme');

var _TodoLayoutTheme2 = _interopRequireDefault(_TodoLayoutTheme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function TodoLayout(_ref, _ref2, _t) {
    var status = _ref.status,
        children = _ref.children;
    var theme = _ref2.theme;

    return _t.h(
        _index.RdiLayoutView,
        null,
        _t.h(_NavView2.default, null),
        _t.h(
            'div',
            { className: theme.content },
            status && !status.complete ? _t.h(_index.ServerLoadingView, { status: status }) : children
        )
    );
}
TodoLayout._rdiJsx = true;
TodoLayout._rdiArg = [{
    theme: _TodoLayoutTheme2.default
}];
//# sourceMappingURL=TodoLayout.js.map