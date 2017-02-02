'use strict';

exports.__esModule = true;
exports.default = undefined;

var _class, _temp, _initialiseProps;

var _reactiveDi = require('reactive-di');

var _index = require('../../../../modules/rdi-fetcher/index');

var _TodosUpdater = require('../../common/TodosUpdater');

var _TodosUpdater2 = _interopRequireDefault(_TodosUpdater);

var _Todo = require('../../common/Todo');

var _Todo2 = _interopRequireDefault(_Todo);

var _TodoCollection = require('../../common/TodoCollection');

var _TodoCollection2 = _interopRequireDefault(_TodoCollection);

var _TodoValidator = require('../../common/TodoValidator');

var _TodoValidator2 = _interopRequireDefault(_TodoValidator);

var _TodoOptions = require('./TodoOptions');

var _TodoOptions2 = _interopRequireDefault(_TodoOptions);

var _EditableTodo = require('./EditableTodo');

var _EditableTodo2 = _interopRequireDefault(_EditableTodo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TodoService = (_temp = _class = function () {
    function TodoService(options, updater, editableTodo, todos, validator, fetch) {
        _classCallCheck(this, TodoService);

        _initialiseProps.call(this);

        this._options = options;
        this._updater = updater;
        this._editableTodo = editableTodo;
        this._todos = todos;
        this._validator = validator;
        this._fetch = fetch;
    }

    TodoService.prototype.setTodo = function setTodo(todo) {
        this._todo = todo;
    };

    return TodoService;
}(), _initialiseProps = function _initialiseProps() {
    var _this = this;

    this.setTitle = function (title) {
        _this._updater.set([_this._editableTodo.copy({ title: title })]);
    };

    this.toggleCompleted = function () {
        var updater = _this._updater,
            todo = _this._todo,
            todos = _this._todos;

        if (!todo) {
            throw new Error('todo not initialized');
        }

        var newTodo = todo.copy({ isCompleted: !todo.isCompleted });

        var completeSubmit = function completeSubmit() {
            return _this._fetch('/todo/' + todo.id, {
                method: 'POST',
                body: newTodo
            }).then(function () {});
        };

        completeSubmit._rdiFn = true;
        updater.set([todos.set(todo.id, newTodo), completeSubmit]);
    };

    this.beginEdit = function () {
        if (!_this._todo) {
            throw new Error('todo not initialized');
        }
        _this._updater.set([_this._editableTodo.copy(_this._todo), _this._validator.validate(_this._todo), _this._options.copy({ isEditing: true })]);
    };

    this.commitEdit = function () {
        var updater = _this._updater,
            todo = _this._todo,
            todos = _this._todos,
            validator = _this._validator,
            editableTodo = _this._editableTodo,
            options = _this._options;

        if (!todo) {
            throw new Error('todo not initialized');
        }
        var errors = validator.validate(_this._editableTodo);
        var transaction = [errors];
        if (!errors.isError) {
            (function () {
                var newTodo = new _Todo2.default(editableTodo);
                transaction.push(todos.set(todo.id, newTodo));
                transaction.push(options.copy({ isEditing: false }));
                var submitEditTodo = function submitEditTodo() {
                    return _this._fetch('/todo/' + todo.id, {
                        method: 'POST',
                        body: newTodo
                    }).then(function () {});
                };
                submitEditTodo._rdiFn = true;
                transaction.push(submitEditTodo);
            })();
        }
        updater.set(transaction);
    };

    this.cancelEdit = function () {
        _this._updater.set([_this._options.copy({ isEditing: false })]);
    };

    this.deleteTodo = function () {
        var updater = _this._updater,
            todo = _this._todo,
            todos = _this._todos;

        if (!todo) {
            throw new Error('todo not initialized');
        }
        var removeSubmit = function removeSubmit() {
            return _this._fetch('/todo/' + todo.id, {
                method: 'DELETE'
            });
        };
        removeSubmit._rdiFn = true;
        updater.set([todos.remove(todo.id), removeSubmit]);
    };
}, _temp);
exports.default = TodoService;
TodoService._rdiArg = [_TodoOptions2.default, _TodosUpdater2.default, _EditableTodo2.default, _TodoCollection2.default, _TodoValidator2.default, _index.createFetch];
//# sourceMappingURL=TodoService.js.map