// @flow

import {mem, action} from 'lom_atom'
import type {ITodo} from './TodoService'

const ESCAPE_KEY = 27
const ENTER_KEY = 13

class TodoItemProps {
    todo: ITodo
}


export class TodoItemService {
    @mem editingId: ?string = null
    @mem editText: string = ''

    _todo: ITodo

    static deps = [TodoItemProps]

    constructor({todo}: TodoItemProps) {
        this._todo = todo
    }

    beginEdit = () => {
        this.editText = this._todo.title
        this.editingId = this._todo.id
    }

    setFocus = (el: HTMLInputElement) => {
        if (el) {
            setTimeout(() => el.focus(), 0)
        }
    }

    @action
    setEditText(e: Event) {
        this.editText = (e.target: any).value
    }

    cancel = () => {
        // this.editText = ''
        this.editingId = null
    }

    submit = () => {
        this._todo.title = this.editText
        this.editText = ''
        this.editingId = null
    }

    onKey = (e: Event) => {
        if (e.which === ESCAPE_KEY) {
            this.cancel()
        } else if (e.which === ENTER_KEY) {
            this.submit()
        }
    }
}

export default function TodoItemView(
    {todo}: {
        todo: ITodo;
    },
    {todoItemService}: {
        todoItemService: TodoItemService;
    }
) {
    const editing = todoItemService.editingId === todo.id
    return <li
        class={`${todo.completed ? 'completed ' : ' '}${editing ? 'editing' : ''}`}
    >
        <div class="view">
            <input
                class="toggle"
                type="checkbox"
                checked={todo.completed || 0}
                onClick={todo.toggle}
            />
            <label onDblClick={todoItemService.beginEdit}>{todo.title}</label>
            <button class="destroy" onClick={todo.destroy} />
        </div>
        {editing
            ? <input
                ref={todoItemService.setFocus}
                class="edit"
                value={todoItemService.editingId && todoItemService.editText || todo.title}
                onBlur={todoItemService.submit}
                onInput={todoItemService.setEditText}
                onKeyDown={todoItemService.onKey}
            />
            : null
        }
    </li>
}
TodoItemView.deps = [{todoItemService: TodoItemService}]
TodoItemView.props = TodoItemProps
