// @flow
import {theme} from 'reactive-di'
import TodoService from './TodoService'
import TodoFilterService from './TodoFilterService'
import type {ITodo} from './TodoService'

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
    {todoService, todoFilterService}: {
        todoService: TodoService;
        todoFilterService: TodoFilterService;
    },
    {theme: {css}}: {
        theme: TodoMainTheme;
    }
) {
    if (!todoService.todos.length) {
        return null
    }

    return <section class={css.main}>
        <input
            id="input"
            class={css.toggleAll}
            type="checkbox"
            onChange={todoService.toggleAll}
            checked={todoService.activeTodoCount === 0}
        />
        <ul class={css.todoList} id="items">
            {todoFilterService.filteredTodos.map((todo: ITodo) =>
                <TodoItemView
                    key={todo.id}
                    todo={todo}
                />
            )}
        </ul>
    </section>
}
