// @flow
import {action, mem} from 'lom_atom'
import {props, theme} from 'reactive-di'

interface IStore {
    addTodo(title: string): void;
}

interface ITodoHeaderProps {
    todoService: IStore
}

class TodoToAdd {
    @mem title: string = ''
    _todoService: IStore

    @props set props({todoService}: ITodoHeaderProps) {
        this._todoService = todoService
    }

    @action
    onInput({target}: Event) {
        this.title = (target: any).value
    }

    onKeyDown = (e: Event) => {
        if (e.keyCode === 13 && this.title) {
            this._todoService.addTodo(this.title)
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
    _: ITodoHeaderProps,
    {todoToAdd, theme: {css}}: {
        theme: TodoHeaderTheme;
        todoToAdd: TodoToAdd;
    }
) {
    return <header>
        <input
            class={css.newTodo}
            placeholder="What needs to be done?"
            onInput={todoToAdd.onInput}
            value={todoToAdd.title}
            onKeyDown={todoToAdd.onKeyDown}
            autoFocus={true}
        />
    </header>
}
