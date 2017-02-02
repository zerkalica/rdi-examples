'use strict';

exports.__esModule = true;
exports.default = exports.TodoCollectionUpdater = undefined;

var _class, _temp, _dec, _class2, _class3, _temp2, _dec2, _class4;

var _annotations = require('reactive-di/annotations');

var _reactiveDi = require('reactive-di');

var _index = require('../../../modules/rdi-helpers/index');

var _index2 = require('../../../modules/rdi-fetcher/index');

var _Todo = require('./Todo');

var _Todo2 = _interopRequireDefault(_Todo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TodoCollectionUpdater = exports.TodoCollectionUpdater = (_temp = _class = function (_Updater) {
    _inherits(TodoCollectionUpdater, _Updater);

    function TodoCollectionUpdater() {
        _classCallCheck(this, TodoCollectionUpdater);

        return _possibleConstructorReturn(this, _Updater.apply(this, arguments));
    }

    return TodoCollectionUpdater;
}(_reactiveDi.Updater), _class.pending = true, _temp);
var TodoCollection = (_dec = (0, _annotations.source)({ key: 'TodoCollection' }), _dec(_class2 = (_temp2 = _class3 = function (_BaseCollection) {
    _inherits(TodoCollection, _BaseCollection);

    function TodoCollection() {
        _classCallCheck(this, TodoCollection);

        return _possibleConstructorReturn(this, _BaseCollection.apply(this, arguments));
    }

    TodoCollection.prototype.createItem = function createItem(rec) {
        return new _Todo2.default(rec);
    };

    return TodoCollection;
}(_index.BaseCollection), _class3.Updater = TodoCollectionUpdater, _temp2)) || _class2);
exports.default = TodoCollection;
var TodoCollectionHooks = (_dec2 = (0, _annotations.hooks)(TodoCollection), _dec2(_class4 = function () {
    function TodoCollectionHooks(updater, fetch) {
        _classCallCheck(this, TodoCollectionHooks);

        this._updater = updater;
        this._fetch = fetch;
    }

    TodoCollectionHooks.prototype.onMount = function onMount() {
        var _this3 = this;

        var load = function load() {
            return _this3._fetch('/todos', {
                method: 'GET'
            }).then(function (data) {
                return [new TodoCollection(data)];
            });
        };
        load._rdiFn = true;
        this._updater.set([load]);
    };

    return TodoCollectionHooks;
}()) || _class4);
TodoCollectionHooks._rdiArg = [TodoCollectionUpdater, _index2.createFetch];
//# sourceMappingURL=TodoCollection.js.map