'use strict';

exports.__esModule = true;
exports.default = undefined;

var _Todo = require('./Todo');

var _Todo2 = _interopRequireDefault(_Todo);

var _TodoCollection = require('./TodoCollection');

var _TodoCollection2 = _interopRequireDefault(_TodoCollection);

var _TodoFilterParams = require('./TodoFilterParams');

var _TodoFilterParams2 = _interopRequireDefault(_TodoFilterParams);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function filterCompleted(item) {
    return item.isCompleted;
}

filterCompleted._rdiFn = true;
filterCompleted._rdiArg = [_Todo2.default];
function filterNotCompleted(item) {
    return !item.isCompleted;
}

filterNotCompleted._rdiFn = true;
filterNotCompleted._rdiArg = [_Todo2.default];

var TodoFilteredCollection = function TodoFilteredCollection(allItems, todoParams) {
    _classCallCheck(this, TodoFilteredCollection);

    var items = void 0;
    switch (todoParams.selectedGroup) {
        case 'all':
            items = allItems.items;
            break;
        case 'completed':
            items = allItems.items.filter(filterCompleted);
            break;
        case 'active':
            items = allItems.items.filter(filterNotCompleted);
            break;
        default:
            throw new Error('Unhandlered group: ' + todoParams.selectedGroup);
    }
    this.items = [].concat(items).reverse();
    this.hasCompleted = !!this.items.find(filterCompleted);
    this.totalCount = allItems.length;
    this.itemsCount = items.length;
    this.selectedGroup = todoParams.selectedGroup;
};

exports.default = TodoFilteredCollection;
TodoFilteredCollection._rdiArg = [_TodoCollection2.default, _TodoFilterParams2.default];
//# sourceMappingURL=TodoFilteredCollection.js.map