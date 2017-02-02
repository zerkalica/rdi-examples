'use strict';

exports.__esModule = true;
exports.default = undefined;

var _reactiveDi = require('reactive-di');

var _modernRouter = require('modern-router');

var _index = require('../../../modules/rdi-fetcher/index');

var _TodoCollection = require('../common/TodoCollection');

var _TodoCollection2 = _interopRequireDefault(_TodoCollection);

var _Todo = require('../common/Todo');

var _Todo2 = _interopRequireDefault(_Todo);

var _TodosUpdater = require('../common/TodosUpdater');

var _TodosUpdater2 = _interopRequireDefault(_TodosUpdater);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function filterNotCompleted(todo) {
    return !todo.isCompleted;
}

filterNotCompleted._rdiFn = true;
filterNotCompleted._rdiArg = [_Todo2.default];

var TodosFooterService = function TodosFooterService(rm, updater, values, fetch) {
    var _this = this;

    _classCallCheck(this, TodosFooterService);

    this.showAll = function () {
        _this._rm.update(null, {
            group: 'all'
        });
    };

    this.showActive = function () {
        _this._rm.update(null, {
            group: 'active'
        });
    };

    this.showCompleted = function () {
        _this._rm.update(null, {
            group: 'completed'
        });
    };

    this.clearCompleted = function () {
        var submitClearCompleted = function submitClearCompleted() {
            return _this._fetch('/todos', {
                method: 'DELETE',
                body: {
                    isCompleted: true
                }
            }).then(function () {});
        };

        submitClearCompleted._rdiFn = true;
        _this._updater.set([_this._values.filter(filterNotCompleted), submitClearCompleted]);
    };

    this.indexUrl = rm.build('index');
    this.activeUrl = rm.build('TodosPage', { group: 'active' });
    this.completedUrl = rm.build('TodosPage', { group: 'completed' });
    this._rm = rm;
    this._updater = updater;
    this._values = values;
    this._fetch = fetch;
};

exports.default = TodosFooterService;
TodosFooterService._rdiArg = [_modernRouter.RouterManager, _TodosUpdater2.default, _TodoCollection2.default, _index.createFetch];
//# sourceMappingURL=TodosFooterService.js.map