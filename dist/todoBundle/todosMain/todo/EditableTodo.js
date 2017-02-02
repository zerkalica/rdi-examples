'use strict';

exports.__esModule = true;
exports.default = undefined;

var _dec, _class;

var _annotations = require('reactive-di/annotations');

var _Todo2 = require('../../common/Todo');

var _Todo3 = _interopRequireDefault(_Todo2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EditableTodo = (_dec = (0, _annotations.source)({ key: 'EditableTodo' }), _dec(_class = function (_Todo) {
  _inherits(EditableTodo, _Todo);

  function EditableTodo() {
    _classCallCheck(this, EditableTodo);

    return _possibleConstructorReturn(this, _Todo.apply(this, arguments));
  }

  return EditableTodo;
}(_Todo3.default)) || _class);
exports.default = EditableTodo;
//# sourceMappingURL=EditableTodo.js.map