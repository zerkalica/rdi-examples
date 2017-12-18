// @flow

import {mem} from 'lom_atom'
import {theme} from 'reactive-di'

import TodoRepository from './models/TodoRepository'

import TodoHeaderView from './TodoHeaderView'
import TodoMainView from './TodoMainView'
import TodoFooterView from './TodoFooterView'

class TodoAppTheme {
    @theme get css() {
        return {
            customized: {
                background: '#ffffef'
            },
            todoapp: {
                background: '#fff',
                position: 'relative',
                border: '1px solid #ededed',
                boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1)'
            }
        }
    }
}

export default function TodoAppView(
    _: {},
    {
        theme: {css}
    }: {
        // One instance per TodoHeaderView, TodoMainView, TodoFooterView
        // Without it, all views receives separate instance of TodoRepository
        repository: TodoRepository;
        theme: TodoAppTheme;
    }
) {
    return <div rdi_theme class={css.todoapp}>
        <TodoHeaderView id="header" />
        <TodoMainView class={css.customized} id="main" />
        <TodoFooterView id="footer" />
    </div>
}
