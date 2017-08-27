// @flow

import {mem, action, props} from 'lom_atom'
import type {ITodo} from './TodoService'

import atomize from '../atomize'

const ESCAPE_KEY = 27
const ENTER_KEY = 13

interface ITodoItemProps {
    todo: ITodo;
}

export class TodoItemService {
    @mem editingId: ?string = null
    @mem editText: string = ''

    @props _props: ITodoItemProps

    beginEdit = () => {
        this.editText = this._props.todo.title
        this.editingId = this._props.todo.id
    }

    setFocus = (el: any) => {
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
        this._props.todo.title = this.editText
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

interface ITodoItemContext {
    todoItemService: TodoItemService;
}

export default function TodoItemView(
    {todo}: ITodoItemProps,
    todoItemService: TodoItemService
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
TodoItemView.deps = [TodoItemService]
