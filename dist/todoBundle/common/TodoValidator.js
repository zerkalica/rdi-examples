'use strict';

exports.__esModule = true;
exports.default = undefined;

var _TodoErrors = require('./TodoErrors');

var _TodoErrors2 = _interopRequireDefault(_TodoErrors);

var _TodoValidatorLang = require('./TodoValidatorLang');

var _TodoValidatorLang2 = _interopRequireDefault(_TodoValidatorLang);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TodoValidator = function () {
    function TodoValidator(lang) {
        _classCallCheck(this, TodoValidator);

        this._lang = lang;
    }

    TodoValidator.prototype.validate = function validate(todo) {
        var l = this._lang;

        var errors = new _TodoErrors2.default();
        if (!todo.title) {
            errors.isError = true;
            errors.title = l.requiredTitle;
        }

        return errors;
    };

    return TodoValidator;
}();

exports.default = TodoValidator;
TodoValidator._rdiArg = [_TodoValidatorLang2.default];
//# sourceMappingURL=TodoValidator.js.map