// @flow

import {mem} from 'lom_atom'
import {theme} from 'reactive-di'

import {ItemView} from '../common'

import TodoService from './TodoService'
import TodoFilterService from './TodoFilterService'

import TodoHeaderView from './TodoHeaderView'
import TodoMainView from './TodoMainView'
import TodoFooterView from './TodoFooterView'

interface TodoAppProps {
}

class TodoAppTheme {
    @mem @theme get css() {
        return {
            todoapp: {
                background: '#fff',
                position: 'relative',
                border: '1px solid #ededed',
                boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1)'
            },

            '@global': {
                ':focus': {
                    outline: 0
                },
                html: {
                    margin: 0,
                    padding: 0
                },
                body: {
                    font: '14px "Helvetica Neue", Helvetica, Arial, sans-serif',
                    lineHeight: '1.4em',
                    background: '#f5f5f5',
                    color: '#4d4d4d',
                    minWidth: '230px',
                    maxWidth: '550px',
                    margin: '0 auto',
                    padding: 0,
                    '-webkit-font-smoothing': 'antialiased',
                    '-moz-osx-font-smoothing': 'grayscale',
                    fontWeight: '300'
                }
            }
        }
    }
}

export default function TodoApp(
    {}: TodoAppProps,
    {todoService, todoFilterService, theme: {css} }: {
        todoService: TodoService;
        todoFilterService: TodoFilterService;
        theme: TodoAppTheme;
    }
) {
    return <div>
        {/* Loading fix: access data in TodoApp first to throw exception, if no todos loaded */}
        {todoService.activeTodoCount > 0 ? null : null}
        <div style={{padding: '0.3em 0.5em'}}>{todoService.isOperationRunning ? 'Saving...' : 'Idle'}</div>
        <div class={css.todoapp}>
            <TodoHeaderView todoService={todoService} />
            <TodoMainView todoService={todoService} todoFilterService={todoFilterService} />
            <TodoFooterView todoService={todoService} todoFilterService={todoFilterService} />
        </div>
    </div>
}
