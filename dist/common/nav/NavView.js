'use strict';

exports.__esModule = true;
exports.SavingStatus = undefined;

var _class;

exports.default = NavView;

var _reactiveDi = require('reactive-di');

var _annotations = require('reactive-di/annotations');

var _modernRouter = require('modern-router');

var _index = require('../../../modules/rdi-helpers/index');

var _index2 = require('../../../modules/rdi-ui-common/index');

var _NavTheme = require('./NavTheme');

var _NavTheme2 = _interopRequireDefault(_NavTheme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SavingStatus = exports.SavingStatus = (0, _annotations.abstract)(_class = function (_UpdaterStatus) {
    _inherits(SavingStatus, _UpdaterStatus);

    function SavingStatus() {
        _classCallCheck(this, SavingStatus);

        return _possibleConstructorReturn(this, _UpdaterStatus.apply(this, arguments));
    }

    return SavingStatus;
}(_reactiveDi.UpdaterStatus)) || _class;

function NavView(props, _ref, _t) {
    var status = _ref.status,
        theme = _ref.theme,
        rm = _ref.rm,
        helper = _ref.helper;

    return _t.h(
        'nav',
        { className: theme.wrapper },
        _t.h(
            'ul',
            { className: theme.block },
            _t.h(
                'li',
                { className: theme.active },
                _t.h(
                    'a',
                    {
                        className: theme.link,
                        onClick: helper.click(function () {}),
                        href: rm.build('TodosPage', { group: 'all' })
                    },
                    'Todos'
                )
            )
        ),
        _t.h(
            'div',
            { className: theme.statusWrapper },
            _t.h(_index2.ServerStatusView, { status: status })
        )
    );
}
NavView._rdiJsx = true;
NavView._rdiArg = [{
    rm: _modernRouter.RouterManager,
    theme: _NavTheme2.default,
    helper: _index.EventHelper,
    status: SavingStatus
}];
//# sourceMappingURL=NavView.js.map