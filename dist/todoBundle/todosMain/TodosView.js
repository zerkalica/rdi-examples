'use strict';

exports.__esModule = true;
exports.default = TodosView;

var _Todo = require('../common/Todo');

var _Todo2 = _interopRequireDefault(_Todo);

var _TodoFilteredCollection = require('../common/TodoFilteredCollection');

var _TodoFilteredCollection2 = _interopRequireDefault(_TodoFilteredCollection);

var _TodoView = require('./todo/TodoView');

var _TodoView2 = _interopRequireDefault(_TodoView);

var _TodosTheme = require('./TodosTheme');

var _TodosTheme2 = _interopRequireDefault(_TodosTheme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function TodosView(_ref, _ref2, _t) {
    var todos = _ref.todos;
    var theme = _ref2.theme;

    return _t.h(
        'ul',
        { className: theme.wrapper },
        todos.items.map(function (todo) {
            return _t.h(
                'li',
                { className: theme.item, key: todo.id },
                _t.h(_TodoView2.default, { todo: todo })
            );
        })
    );
}
TodosView._rdiJsx = true;
TodosView._rdiArg = [{
    theme: _TodosTheme2.default
}];
//# sourceMappingURL=TodosView.js.map