'use strict';

exports.__esModule = true;
exports.routes = exports.pages = exports.rdi = undefined;

var _dec, _class;

var _annotations = require('reactive-di/annotations');

var _reactiveDi = require('reactive-di');

var _index = require('../../modules/rdi-fetcher/index');

var _index2 = require('../../modules/rdi-api-emulator/index');

var _NavView = require('../common/nav/NavView');

var _createTodoEmulatedApi = require('./todoApiEmulator/createTodoEmulatedApi');

var _createTodoEmulatedApi2 = _interopRequireDefault(_createTodoEmulatedApi);

var _TodosPage = require('./TodosPage');

var _TodosPage2 = _interopRequireDefault(_TodosPage);

var _TodosUpdater = require('./common/TodosUpdater');

var _TodosUpdater2 = _interopRequireDefault(_TodosUpdater);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TodosPageSavingStatus = (_dec = (0, _annotations.updaters)(_TodosUpdater2.default), _dec(_class = function (_UpdaterStatus) {
    _inherits(TodosPageSavingStatus, _UpdaterStatus);

    function TodosPageSavingStatus() {
        _classCallCheck(this, TodosPageSavingStatus);

        return _possibleConstructorReturn(this, _UpdaterStatus.apply(this, arguments));
    }

    return TodosPageSavingStatus;
}(_reactiveDi.UpdaterStatus)) || _class);


var rdi = [_TodosUpdater2.default, [_NavView.SavingStatus, TodosPageSavingStatus], [_index.createFetch, _index2.createEmulatedFetch], [_index2.EmulatedApi, _createTodoEmulatedApi2.default]];

var pages = {
    TodosPage: _TodosPage2.default
};

var routes = {
    index: {
        page: 'TodosPage',
        pattern: '/',
        defaults: {
            group: 'all'
        }
    },
    TodosPage: {
        pattern: '/todos/<group>',
        defaults: {
            group: 'all'
        }
    }
};

exports.rdi = rdi;
exports.pages = pages;
exports.routes = routes;
//# sourceMappingURL=index.js.map