// @flow

import {action, mem} from 'lom_atom'
import type {ITodo} from './TodoService'

const ESCAPE_KEY = 27
const ENTER_KEY = 13

export class TodoItemService {
    @mem editingId: ?string = null
    @mem editText: string = ''

    _todo: ITodo

    beginEdit = (todo: ITodo) => {
        this._todo = todo
        this.editText = todo.title
        this.editingId = todo.id
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
        this.editText = ''
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

const todoItemService = new TodoItemService()

export default function TodoItemView(
    {todo}: {
        todo: ITodo;
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
            <label onDblClick={() => todoItemService.beginEdit(todo)}>{todo.title}</label>
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
