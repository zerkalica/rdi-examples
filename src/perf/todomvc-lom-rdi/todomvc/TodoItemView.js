// @flow

import {mem} from 'lom_atom'
import type {ITodo} from './TodoService'

const ESCAPE_KEY = 27
const ENTER_KEY = 13

class TodoItemProps {
    todo: ITodo
}


export class TodoItemService {
    editingId: ?string = null
    @mem editText: string = ''

    _todo: ITodo

    static deps = [TodoItemProps]

    constructor({todo}: TodoItemProps) {
        this._todo = todo
    }

    beginEdit = () => {
        this.editingId = this._todo.id
    }

    setFocus = (el: HTMLInputElement) => {
        setTimeout(() => el.focus(), 0)
    }

    setEditText = (e: Event) => {
        this.editText = (e.target: any).value
    }

    handleKeyDown = (e: Event) => {
        if (e.which === ESCAPE_KEY) {
            this.editText = ''
            this.editingId = null
        } else if (e.which === ENTER_KEY) {
            this._todo.title = this.editText
            this.editText = ''
            this.editingId = null
        }
    }

    handleSubmit = () => {
        this._todo.title = this.editText
        this.editText = ''
        this.editingId = null
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
    return <li
        class={{
            completed: todo.completed,
            editing: todoItemService.editingId === todo.id
        }}
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
        {todoItemService.editingId === todo.id
            ? <input
                ref={todoItemService.setFocus}
                class="edit"
                value={todoItemService.editingId && todoItemService.editText || todo.title}
                onBlur={todoItemService.handleSubmit}
                onChange={todoItemService.setEditText}
                onKeyDown={todoItemService.handleKeyDown}
            />
            : null
        }
    </li>
}
TodoItemView.deps = [{todoItemService: TodoItemService}]
TodoItemView.props = TodoItemProps
