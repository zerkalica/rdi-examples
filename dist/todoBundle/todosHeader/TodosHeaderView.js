'use strict';

exports.__esModule = true;
exports.default = TodosHeaderView;

var _TodosHeaderTheme = require('./TodosHeaderTheme');

var _TodosHeaderTheme2 = _interopRequireDefault(_TodosHeaderTheme);

var _TodoHeaderLang = require('./TodoHeaderLang');

var _TodoHeaderLang2 = _interopRequireDefault(_TodoHeaderLang);

var _TodoAddView = require('./todoAdd/TodoAddView');

var _TodoAddView2 = _interopRequireDefault(_TodoAddView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function TodosHeaderView(props, _ref, _t) {
    var theme = _ref.theme,
        lang = _ref.lang;

    return _t.h(
        'header',
        { className: theme.wrapper },
        _t.h(
            'h1',
            { className: theme.header },
            lang.todos
        ),
        _t.h(_TodoAddView2.default, null)
    );
}

TodosHeaderView._rdiJsx = true;
TodosHeaderView._rdiArg = [{
    theme: _TodosHeaderTheme2.default,
    lang: _TodoHeaderLang2.default
}];
//# sourceMappingURL=TodosHeaderView.js.map