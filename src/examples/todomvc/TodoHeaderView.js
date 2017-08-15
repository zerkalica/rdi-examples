// @flow

import {action, mem} from 'lom_atom'
import type {NamesOf} from 'lom_atom'

interface IStore {
    addTodo(title: string): void;
}

interface ITodoHeaderViewProps {
    todoService: IStore
}

class TodoHeaderViewProps implements ITodoHeaderViewProps {
    todoService: IStore
}

class TodoToAdd {
    @mem title: string = ''
    _todoService: IStore

    static deps = [TodoHeaderViewProps]

    constructor({todoService}: TodoHeaderViewProps) {
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

function TodoHeaderTheme() {
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
TodoHeaderTheme.theme = true

export default function TodoHeaderView(
    _: ITodoHeaderViewProps,
    {todoToAdd, theme}: {
        theme: NamesOf<typeof TodoHeaderTheme>;
        todoToAdd: TodoToAdd;
    }
) {
    return <header>
        <input
            className={theme.newTodo}
            placeholder="What needs to be done?"
            onInput={todoToAdd.onInput}
            value={todoToAdd.title}
            onKeyDown={todoToAdd.onKeyDown}
            autoFocus={true}
        />
    </header>
}
TodoHeaderView.deps = [{todoToAdd: TodoToAdd, theme: TodoHeaderTheme}]
TodoHeaderView.props = TodoHeaderViewProps
