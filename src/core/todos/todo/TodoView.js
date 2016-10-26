// @flow
import {component} from 'reactive-di/annotations'
import {ErrorableElement} from 'rdi-ui-common'
import {EventHelper, KEYCODE} from 'rdi-helpers'
import Todo from 'rdi-todo/core/models/Todo'
import TodoErrors from 'rdi-todo/core/models/TodoErrors'

import TodoTheme from './TodoTheme'
import TodoService from './TodoService'
import TodoOptions from './TodoOptions'
import EditableTodo from './EditableTodo'

interface TodoViewState {
    theme: TodoTheme;
    service: TodoService;
    helper: EventHelper;
    options: TodoOptions;
    editableTodo: EditableTodo;
    errors: TodoErrors;
}

function TodoView(
    {todo}: {todo: Todo},
    {
        theme,
        options,
        service,
        helper,
        errors,
        editableTodo
    }: TodoViewState
) {
    service.setTodo(todo)

    return <div className={theme.wrapper}>
        <span className={theme.completed}>
            <input
                type="checkbox"
                id="isCompleted"
                name="isCompleted"
                checked={todo.isCompleted}
                onChange={helper.change(service.toggleCompleted)}
            />
        </span>
        {options.isEditing ? [
            <ErrorableElement
                key="editingTitle"
                error={errors.title}
                errorSide="bottom"
            >
                <input
                    id="editingTitle"
                    name="editingTitle"
                    value={editableTodo.title}
                    onChange={helper.change(service.setTitle)}
                    onKeyDown={helper.keyMap([
                        [KEYCODE.ESC, service.cancelEdit],
                        [KEYCODE.ENTER, service.commitEdit]
                    ])}
                    autoFocus
                    size={240}
                    maxLength={240}
                    className={theme.editingTitle}
                    placeholder="todo"
                />
            </ErrorableElement>,
            <button
                key="commitEdit"
                id="commitEdit"
                name="commitEdit"
                className={theme.commitEdit}
                onClick={service.commitEdit}
            ><span className={theme.okIcon}/></button>,
            <button
                key="cancelEdit"
                id="cancelEdit"
                name="cancelEdit"
                className={theme.cancelEdit}
                onClick={service.cancelEdit}
            ><span className={theme.cancelIcon}/></button>
        ] : <button
            id="beginEdit"
            className={theme.beginEdit}
            onClick={helper.click(service.beginEdit)}
        >{todo.title}</button>}
        <button
            id="deleteTodo"
            className={theme.deleteTodo}
            onClick={helper.click(service.deleteTodo)}
        ><span className={theme.deleteIcon}/></button>
    </div>
}

export default component({
    register: [
        TodoErrors,
        TodoService
    ]
})(TodoView)
