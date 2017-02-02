'use strict';

exports.__esModule = true;
exports.default = TodoAddView;

var _index = require('../../../../modules/rdi-helpers/index');

var _index2 = require('../../../../modules/rdi-ui-common/index');

var _TodoErrors = require('../../common/TodoErrors');

var _TodoErrors2 = _interopRequireDefault(_TodoErrors);

var _TodoAddTheme = require('./TodoAddTheme');

var _TodoAddTheme2 = _interopRequireDefault(_TodoAddTheme);

var _TodoAddLang = require('./TodoAddLang');

var _TodoAddLang2 = _interopRequireDefault(_TodoAddLang);

var _TodoAddService = require('./TodoAddService');

var _TodoAddService2 = _interopRequireDefault(_TodoAddService);

var _TodoAddValues = require('./TodoAddValues');

var _TodoAddValues2 = _interopRequireDefault(_TodoAddValues);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function TodoAddView(props, _ref, _t) {
    var theme = _ref.theme,
        values = _ref.values,
        errors = _ref.errors,
        lang = _ref.lang,
        helper = _ref.helper,
        service = _ref.service;

    return _t.h(
        'div',
        { className: theme.group },
        _t.h(
            'button',
            {
                onClick: service.toggleAll,
                className: theme.toggleAll
            },
            _t.h('span', { className: theme.togleAllIcon })
        ),
        _t.h(
            _index2.ErrorableElement,
            {
                errorSide: 'bottom',
                error: errors.title,
                className: theme.error
            },
            _t.h('input', {
                id: 'addTodoTitle',
                className: theme.ctl,
                type: 'text',
                placeholder: lang.todoPlaceholder,
                autoFocus: true,
                value: values.title,
                onChange: helper.change(service.setTitle),
                onKeyDown: helper.keyMap([[_index.KEYCODE.ENTER, service.commitAdding], [_index.KEYCODE.ESC, service.cancelAdding]])
            })
        ),
        _t.h(
            'button',
            {
                type: 'submit',
                className: theme.submit,
                onClick: helper.click(service.commitAdding)
            },
            _t.h('span', { className: theme.addIcon })
        )
    );
}

TodoAddView._rdiJsx = true;
TodoAddView._rdiArg = [{
    theme: _TodoAddTheme2.default,
    helper: _index.EventHelper,
    lang: _TodoAddLang2.default,
    service: _TodoAddService2.default,
    values: _TodoAddValues2.default,
    errors: _TodoErrors2.default
}];
//# sourceMappingURL=TodoAddView.js.map