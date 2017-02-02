'use strict';

exports.__esModule = true;
exports.default = undefined;

var _class, _temp;

var _reactiveDi = require('reactive-di');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TodosUpdater = (_temp = _class = function (_Updater) {
    _inherits(TodosUpdater, _Updater);

    function TodosUpdater() {
        _classCallCheck(this, TodosUpdater);

        return _possibleConstructorReturn(this, _Updater.apply(this, arguments));
    }

    return TodosUpdater;
}(_reactiveDi.Updater), _class.maxSize = 1, _temp);
exports.default = TodosUpdater;
//# sourceMappingURL=TodosUpdater.js.map