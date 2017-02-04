// @flow
import {eventSetter, SourceStatus} from 'reactive-di'
import {hooks, component} from 'reactive-di/annotations'
import {ErrorableElement} from 'rdi-ui-common'
import {EventHelper, KEYCODE} from 'rdi-helpers'
import Todo from 'rdi-todo/todoBundle/common/Todo'
import TodoErrors from 'rdi-todo/todoBundle/common/TodoErrors'

import TodoTheme from './TodoTheme'
import TodoService from './TodoService'
import TodoOptions from './TodoOptions'
import EditableTodo from './EditableTodo'
import TodoRefs from './TodoRefs'

class EditableTodoStatus extends SourceStatus {
    static statuses = [EditableTodo]
}

interface TodoViewState {
    theme: TodoTheme;
    service: TodoService;
    helper: EventHelper;
    options: TodoOptions;
    editableTodo: EditableTodo;
    errors: TodoErrors;
    editStatus: EditableTodoStatus;
    refs: TodoRefs;
}

interface TodoProps {
    item: Todo;
}

function TodoView(
    {item}: TodoProps,
    {
        theme,
        refs,
        options,
        service,
        helper,
        errors,
        editableTodo,
        editStatus
    }: TodoViewState
) {
    return <div className={theme.wrapper}>
        <span className={theme.completed}>
            <input
                type="checkbox"
                id="isCompleted"
                name="isCompleted"
                checked={item.isCompleted}
                onChange={helper.change(service.toggleCompleted)}
            />
        </span>
        <span className={theme.id}>{item.id}</span>
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
                    onInput={eventSetter(editableTodo).title}
                    onKeyDown={helper.keyMap([
                        [KEYCODE.ESC, service.cancelEdit],
                        [KEYCODE.ENTER, service.commitEdit]
                    ])}
                    ref={refs.editingTitle.set}
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
            className={theme.getBeginEdit(editStatus)}
            onClick={helper.click(service.beginEdit)}
        >{editStatus.error ? editStatus.error.message : item.title}</button>}
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

@hooks(TodoView)
class TodoViewHooks {
    _service: TodoService

    constructor(service: TodoService) {
        this._service = service
    }

    willMount({item}: TodoProps) {
        this._service.setTodo(item)
    }

    willUpdate({item}: TodoProps) {
        this._service.setTodo(item)
    }
}
