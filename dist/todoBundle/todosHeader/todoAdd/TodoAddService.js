'use strict';

exports.__esModule = true;
exports.default = undefined;

var _class, _class2, _temp, _initialiseProps;

var _annotations = require('reactive-di/annotations');

var _reactiveDi = require('reactive-di');

var _TodoValidator = require('../../common/TodoValidator');

var _TodoValidator2 = _interopRequireDefault(_TodoValidator);

var _TodoCollection = require('../../common/TodoCollection');

var _TodoCollection2 = _interopRequireDefault(_TodoCollection);

var _Todo = require('../../common/Todo');

var _Todo2 = _interopRequireDefault(_Todo);

var _TodoGroupState = require('../../common/TodoGroupState');

var _TodoGroupState2 = _interopRequireDefault(_TodoGroupState);

var _TodosUpdater = require('../../common/TodosUpdater');

var _TodosUpdater2 = _interopRequireDefault(_TodosUpdater);

var _index = require('../../../../modules/rdi-fetcher/index');

var _TodoAddValues = require('./TodoAddValues');

var _TodoAddValues2 = _interopRequireDefault(_TodoAddValues);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TodoAddService = (0, _annotations.service)(_class = (_temp = _class2 = function TodoAddService(values, updater, validator, todos, gs, fetch) {
    _classCallCheck(this, TodoAddService);

    _initialiseProps.call(this);

    this._values = values;
    this._updater = updater;
    this._validator = validator;
    this._todos = todos;
    this._gs = gs;
    this._fetch = fetch;
}, _initialiseProps = function _initialiseProps() {
    var _this = this;

    this.setTitle = function (title) {
        _this._updater.set([_this._values.copy({ title: title })]);
    };

    this.commitAdding = function () {
        var errors = _this._validator.validate(_this._values);
        var transaction = [errors];
        if (!errors.isError) {
            (function () {
                var newTodo = new _Todo2.default(_this._values);
                transaction.push(_this._todos.add(newTodo));
                transaction.push(new _TodoAddValues2.default());
                var submitAddTodo = function submitAddTodo() {
                    return _this._fetch('/todo', {
                        method: 'PUT',
                        body: newTodo
                    }).then(function (_ref) {
                        var id = _ref.id;
                        return [_this._todos.set(newTodo.id, newTodo.copy({ id: id }))];
                    });
                };
                submitAddTodo._rdiFn = true;
                transaction.push(submitAddTodo);
            })();
        }
        _this._updater.set(transaction);
    };

    this.cancelAdding = function () {
        _this._updater.set([_this._values.copy({ title: '' })]);
    };

    this.toggleAll = function () {
        var groupState = _this._gs;
        var todos = _this._todos;
        var isCompleted = !groupState.isAllCompleted;

        var submitToggleAll = function submitToggleAll() {
            return _this._fetch('/todos', {
                method: 'POST',
                body: {
                    isCompleted: isCompleted
                }
            }).then(function () {});
        };

        submitToggleAll._rdiFn = true;
        _this._updater.set([todos.update(null, function (todo) {
            return todo.copy({ isCompleted: isCompleted });
        }), new _TodoGroupState2.default({ isAllCompleted: isCompleted }), submitToggleAll]);
    };
}, _temp)) || _class;

exports.default = TodoAddService;
TodoAddService._rdiArg = [_TodoAddValues2.default, _TodosUpdater2.default, _TodoValidator2.default, _TodoCollection2.default, _TodoGroupState2.default, _index.createFetch];
//# sourceMappingURL=TodoAddService.js.map