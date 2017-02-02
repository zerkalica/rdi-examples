'use strict';

exports.__esModule = true;
exports.default = undefined;

var _dec, _class, _class2, _temp;

var _reactiveDi = require('reactive-di');

var _annotations = require('reactive-di/annotations');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TodoLang = (_dec = (0, _annotations.source)({ key: 'TodoLang' }), _dec(_class = (_temp = _class2 = function (_BaseModel) {
    _inherits(TodoLang, _BaseModel);

    function TodoLang() {
        _classCallCheck(this, TodoLang);

        return _possibleConstructorReturn(this, _BaseModel.apply(this, arguments));
    }

    return TodoLang;
}(_reactiveDi.BaseModel), _class2.defaults = {
    requiredTitle: 'Title required'
}, _temp)) || _class);
exports.default = TodoLang;
//# sourceMappingURL=TodoLang.js.map