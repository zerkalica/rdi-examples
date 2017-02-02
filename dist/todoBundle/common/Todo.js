'use strict';

exports.__esModule = true;
exports.default = undefined;

var _dec, _class, _class2, _temp;

var _shortid = require('shortid');

var _shortid2 = _interopRequireDefault(_shortid);

var _reactiveDi = require('reactive-di');

var _annotations = require('reactive-di/annotations');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Todo = (_dec = (0, _annotations.source)({ key: 'Todo' }), _dec(_class = (_temp = _class2 = function (_BaseModel) {
    _inherits(Todo, _BaseModel);

    function Todo() {
        var rec = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _classCallCheck(this, Todo);

        var _this = _possibleConstructorReturn(this, _BaseModel.call(this, rec));

        _this.id = rec.id || _shortid2.default.generate();
        _this.created = rec.created || new Date().toISOString();
        return _this;
    }

    return Todo;
}(_reactiveDi.BaseModel), _class2.defaults = {
    id: '',
    title: '',
    isCompleted: false
}, _temp)) || _class);
exports.default = Todo;
//# sourceMappingURL=Todo.js.map