'use strict';

exports.__esModule = true;
exports.default = undefined;

var _dec, _class, _class2, _temp;

var _reactiveDi = require('reactive-di');

var _annotations = require('reactive-di/annotations');

var _Todo = require('../../common/Todo');

var _Todo2 = _interopRequireDefault(_Todo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TodoOptions = (_dec = (0, _annotations.source)({ key: 'TodoOptions' }), _dec(_class = (_temp = _class2 = function (_BaseModel) {
    _inherits(TodoOptions, _BaseModel);

    function TodoOptions() {
        _classCallCheck(this, TodoOptions);

        return _possibleConstructorReturn(this, _BaseModel.apply(this, arguments));
    }

    return TodoOptions;
}(_reactiveDi.BaseModel), _class2.defaults = {
    isEditing: false,
    editingItem: new _Todo2.default()
}, _temp)) || _class);
exports.default = TodoOptions;
//# sourceMappingURL=TodoOptions.js.map