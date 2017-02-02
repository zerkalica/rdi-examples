'use strict';

exports.__esModule = true;
exports.default = undefined;

var _modernRouter = require('modern-router');

var _index = require('../../../modules/rdi-helpers/index');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TodoFilterParams = function TodoFilterParams(_ref) {
    var query = _ref.query;

    _classCallCheck(this, TodoFilterParams);

    switch (query.group) {
        case 'all':
        case 'active':
        case 'completed':
            this.selectedGroup = query.group;
            break;
        default:
            throw new _index.QueryError('group', 'Error group');
    }
};

exports.default = TodoFilterParams;
TodoFilterParams._rdiArg = [_modernRouter.Route];
//# sourceMappingURL=TodoFilterParams.js.map