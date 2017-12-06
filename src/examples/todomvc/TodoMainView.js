// @flow
import {theme} from 'reactive-di'
import Todo from './models/Todo'
import TodoRepository from './models/TodoRepository'

import TodoItemView from './TodoItemView'

class TodoMainTheme {
    @theme get css() {
        const toggleAll = {
            outline: 'none',
            position: 'absolute',
            top: '-55px',
            left: '-12px',
            width: '60px',
            height: '34px',
            textAlign: 'center',
            border: 'none', /* Mobile Safari */

            '&:before': {
                content: '\'❯\'',
                fontSize: '22px',
                color: '#e6e6e6',
                padding: '10px 27px 10px 27px'
            },
            '&:checked:before': {
                color: '#737373'
            }
        }

        return {
            main: {
                position: 'relative',
                zIndex: 2,
                borderTop: '1px solid #e6e6e6'
            },
            toggleAll: {
                ...toggleAll
            },
            todoList: {
                margin: 0,
                padding: 0,
                listStyle: 'none'
            },

            /*
            Hack to remove background from Mobile Safari.
            Can't use it globally since it destroys checkboxes in Firefox
            */
            '@media screen and (-webkit-min-device-pixel-ratio:0)': {
                toggleAll: {
                    ...toggleAll,
                    transform: 'rotate(90deg)',
                    appearance: 'none',
                    '-webkit-appearance': 'none',
                }
            }
        }
    }
}

export default function TodoMainView(
    _: {},
    {
        todoRepository: {todos, toggleAll, activeTodoCount, patching, filteredTodos},
        theme: {css}
    }: {
        todoRepository: TodoRepository;
        theme: TodoMainTheme;
    }
) {
    if (!todos.length) {
        return null
    }

    return <section class={css.main}>
        <input
            id="input"
            class={css.toggleAll}
            disabled={!!patching}
            type="checkbox"
            onChange={toggleAll}
            checked={activeTodoCount === 0}
        />
        <ul class={css.todoList} id="items">
            {filteredTodos.map(todo => <TodoItemView
                id={`todo(${todo.id})`}
                key={todo.id}
                todo={todo}
            />)}
        </ul>
    </section>
}
