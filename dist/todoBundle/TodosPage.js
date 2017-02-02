'use strict';

exports.__esModule = true;

var _dec, _class;

exports.default = TodosPage;

var _annotations = require('reactive-di/annotations');

var _reactiveDi = require('reactive-di');

var _TodoCollection = require('./common/TodoCollection');

var _TodoCollection2 = _interopRequireDefault(_TodoCollection);

var _TodoLayout = require('../common/layout/TodoLayout');

var _TodoLayout2 = _interopRequireDefault(_TodoLayout);

var _TodoFilteredCollection = require('./common/TodoFilteredCollection');

var _TodoFilteredCollection2 = _interopRequireDefault(_TodoFilteredCollection);

var _TodosView = require('./todosMain/TodosView');

var _TodosView2 = _interopRequireDefault(_TodosView);

var _TodosHeaderView = require('./todosHeader/TodosHeaderView');

var _TodosHeaderView2 = _interopRequireDefault(_TodosHeaderView);

var _TodosFooterView = require('./todosFooter/TodosFooterView');

var _TodosFooterView2 = _interopRequireDefault(_TodosFooterView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TodosUpdaterStatus = (_dec = (0, _annotations.updaters)(_TodoCollection2.default.Updater), _dec(_class = function (_UpdaterStatus) {
    _inherits(TodosUpdaterStatus, _UpdaterStatus);

    function TodosUpdaterStatus() {
        _classCallCheck(this, TodosUpdaterStatus);

        return _possibleConstructorReturn(this, _UpdaterStatus.apply(this, arguments));
    }

    return TodosUpdaterStatus;
}(_reactiveDi.UpdaterStatus)) || _class);
function TodosPage(props, _ref, _t) {
    var status = _ref.status,
        todos = _ref.todos;

    return _t.h(
        _TodoLayout2.default,
        { status: status },
        _t.h(_TodosHeaderView2.default, null),
        _t.h(_TodosView2.default, { todos: todos }),
        _t.h(_TodosFooterView2.default, null)
    );
}
TodosPage._rdiJsx = true;
TodosPage._rdiArg = [{
    todos: _TodoFilteredCollection2.default,
    status: TodosUpdaterStatus
}];
//# sourceMappingURL=TodosPage.js.map