'use strict';

exports.__esModule = true;

var _annotations = require('reactive-di/annotations');

var _index = require('../../../../modules/rdi-ui-common/index');

var _index2 = require('../../../../modules/rdi-helpers/index');

var _Todo = require('../../common/Todo');

var _Todo2 = _interopRequireDefault(_Todo);

var _TodoErrors = require('../../common/TodoErrors');

var _TodoErrors2 = _interopRequireDefault(_TodoErrors);

var _TodoTheme = require('./TodoTheme');

var _TodoTheme2 = _interopRequireDefault(_TodoTheme);

var _TodoService = require('./TodoService');

var _TodoService2 = _interopRequireDefault(_TodoService);

var _TodoOptions = require('./TodoOptions');

var _TodoOptions2 = _interopRequireDefault(_TodoOptions);

var _EditableTodo = require('./EditableTodo');

var _EditableTodo2 = _interopRequireDefault(_EditableTodo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function TodoView(_ref, _ref2, _t) {
    var todo = _ref.todo;
    var theme = _ref2.theme,
        options = _ref2.options,
        service = _ref2.service,
        helper = _ref2.helper,
        errors = _ref2.errors,
        editableTodo = _ref2.editableTodo;

    // @todo think about service initializer, move to hooks
    service.setTodo(todo);

    return _t.h(
        'div',
        { className: theme.wrapper },
        _t.h(
            'span',
            { className: theme.completed },
            _t.h('input', {
                type: 'checkbox',
                id: 'isCompleted',
                name: 'isCompleted',
                checked: todo.isCompleted,
                onChange: helper.change(service.toggleCompleted)
            })
        ),
        _t.h(
            'span',
            { className: theme.id },
            todo.id
        ),
        options.isEditing ? [_t.h(
            _index.ErrorableElement,
            {
                key: 'editingTitle',
                error: errors.title,
                errorSide: 'bottom'
            },
            _t.h('input', {
                id: 'editingTitle',
                name: 'editingTitle',
                value: editableTodo.title,
                onChange: helper.change(service.setTitle),
                onKeyDown: helper.keyMap([[_index2.KEYCODE.ESC, service.cancelEdit], [_index2.KEYCODE.ENTER, service.commitEdit]]),
                autoFocus: true,
                size: 240,
                maxLength: 240,
                className: theme.editingTitle,
                placeholder: 'todo'
            })
        ), _t.h(
            'button',
            {
                key: 'commitEdit',
                id: 'commitEdit',
                name: 'commitEdit',
                className: theme.commitEdit,
                onClick: service.commitEdit
            },
            _t.h('span', { className: theme.okIcon })
        ), _t.h(
            'button',
            {
                key: 'cancelEdit',
                id: 'cancelEdit',
                name: 'cancelEdit',
                className: theme.cancelEdit,
                onClick: service.cancelEdit
            },
            _t.h('span', { className: theme.cancelIcon })
        )] : _t.h(
            'button',
            {
                id: 'beginEdit',
                className: theme.beginEdit,
                onClick: helper.click(service.beginEdit)
            },
            todo.title
        ),
        _t.h(
            'button',
            {
                id: 'deleteTodo',
                className: theme.deleteTodo,
                onClick: helper.click(service.deleteTodo)
            },
            _t.h('span', { className: theme.deleteIcon })
        )
    );
}
TodoView._rdiJsx = true;
TodoView._rdiArg = [{
    theme: _TodoTheme2.default,
    service: _TodoService2.default,
    helper: _index2.EventHelper,
    options: _TodoOptions2.default,
    editableTodo: _EditableTodo2.default,
    errors: _TodoErrors2.default
}];
exports.default = (0, _annotations.component)({
    register: [_TodoErrors2.default, _TodoService2.default]
})(TodoView);
//# sourceMappingURL=TodoView.js.map