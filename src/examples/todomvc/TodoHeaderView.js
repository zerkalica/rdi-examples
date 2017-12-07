// @flow
import {action, mem} from 'lom_atom'
import {props, theme} from 'reactive-di'

import TodoRepository from './models/TodoRepository'

class TodoToAdd {
    @mem title: string = ''
    _todoRepository: TodoRepository

    constructor(todoRepository: TodoRepository) {
        this._todoRepository = todoRepository
    }

    get adding(): boolean {
        return !!this._todoRepository.adding
    }

    @action.defer setRef(ref: ?HTMLInputElement) {
        if (!ref) return
        ref.focus()
    }

    @action onInput ({target}: Event) {
        this.title = (target: any).value
    }

    @action onKeyDown(e: Event) {
        if (e.keyCode === 13 && this.title) {
            this._todoRepository.addTodo(this.title)
            this.title = ''
        }
    }
}

class TodoHeaderTheme {
    @theme get css() {
        return {
            newTodo: {
                position: 'relative',
                margin: '0',
                width: '100%',
                fontSize: '24px',
                fontFamily: 'inherit',
                fontWeight: 'inherit',
                lineHeight: '1.4em',
                border: '0',
                color: 'inherit',
                padding: '16px 16px 16px 60px',
                border: 'none',
                background: 'rgba(0, 0, 0, 0.003)',
                boxShadow: 'inset 0 -2px 1px rgba(0,0,0,0.03)',
                boxSizing: 'border-box',
                '-webkit-font-smoothing': 'antialiased',
                '-moz-osx-font-smoothing': 'grayscale'
            }
        }
    }
}

export default function TodoHeaderView(
    _: {},
    {todoToAdd, theme: {css}}: {
        theme: TodoHeaderTheme;
        todoToAdd: TodoToAdd;
    }
) {
    return <header>
        <input
            id="input"
            class={css.newTodo}
            placeholder="What needs to be done?"
            disabled={todoToAdd.adding}
            onInput={todoToAdd.onInput}
            ref={todoToAdd.setRef}
            value={todoToAdd.title}
            onKeyDown={todoToAdd.onKeyDown}
        />
    </header>
}
