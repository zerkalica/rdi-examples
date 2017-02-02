'use strict';

exports.__esModule = true;
exports.default = TodosFooterView;

var _index = require('../../../modules/rdi-helpers/index');

var _TodoFilteredCollection = require('../common/TodoFilteredCollection');

var _TodoFilteredCollection2 = _interopRequireDefault(_TodoFilteredCollection);

var _TodosFooterLang = require('./TodosFooterLang');

var _TodosFooterLang2 = _interopRequireDefault(_TodosFooterLang);

var _TodosFooterTheme = require('./TodosFooterTheme');

var _TodosFooterTheme2 = _interopRequireDefault(_TodosFooterTheme);

var _TodosFooterService = require('./TodosFooterService');

var _TodosFooterService2 = _interopRequireDefault(_TodosFooterService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function TodosFooterView(props, _ref, _t) {
    var lang = _ref.lang,
        theme = _ref.theme,
        data = _ref.data,
        helper = _ref.helper,
        service = _ref.service;

    return _t.h(
        'footer',
        { className: theme.footer },
        _t.h(
            'div',
            { className: theme.todoCount },
            _t.h(
                'strong',
                null,
                lang.countOfTotal({ count: data.itemsCount, total: data.totalCount })
            ),
            ' ' + lang.itemLeft
        ),
        _t.h(
            'ul',
            { className: theme.list },
            _t.h(
                'li',
                { className: theme.listItem },
                _t.h(
                    'a',
                    {
                        className: theme.link(data.selectedGroup === 'all'),
                        href: service.indexUrl,
                        onClick: helper.click(service.showAll)
                    },
                    lang.all
                )
            ),
            _t.h(
                'li',
                { className: theme.listItem },
                _t.h(
                    'a',
                    {
                        className: theme.link(data.selectedGroup === 'active'),
                        href: service.activeUrl,
                        onClick: helper.click(service.showActive)
                    },
                    lang.active
                )
            ),
            _t.h(
                'li',
                { className: theme.listItem },
                _t.h(
                    'a',
                    {
                        className: theme.link(data.selectedGroup === 'completed'),
                        href: service.completedUrl,
                        onClick: helper.click(service.showCompleted)
                    },
                    lang.completed
                )
            )
        ),
        data.hasCompleted ? _t.h(
            'button',
            {
                className: theme.clearCompleted,
                onClick: helper.click(service.clearCompleted)
            },
            lang.clearCompleted
        ) : null
    );
}

TodosFooterView._rdiJsx = true;
TodosFooterView._rdiArg = [{
    lang: _TodosFooterLang2.default,
    theme: _TodosFooterTheme2.default,
    data: _TodoFilteredCollection2.default,
    helper: _index.EventHelper,
    service: _TodosFooterService2.default
}];
//# sourceMappingURL=TodosFooterView.js.map