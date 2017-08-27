// @flow

import type {NamesOf} from 'lom_atom'
import TodoService from './TodoService'
import TodoFilterService, {TODO_FILTER} from './TodoFilterService'

const links = [
    {
        id: TODO_FILTER.ALL,
        title: 'All'
    },
    {
        id: TODO_FILTER.ACTIVE,
        title: 'Active'
    },
    {
        id: TODO_FILTER.COMPLETE,
        title: 'Completed'
    }
]

function createHandler<V: string>(todoFilterService: TodoFilterService, id: V): (e: Event) => void {
    return function handler(e: Event) {
        e.preventDefault()
        todoFilterService.filter = id
    }
}

function TodoFooterTheme() {
    const linkBase = {
        color: 'inherit',
        margin: '3px',
        padding: '3px 7px',
        textDecoration: 'none',
        border: '1px solid transparent',
        borderRadius: '3px',
        '& :hover': {
            borderColor: 'rgba(175, 47, 47, 0.1)'
        }
    }

    return {
        footer: {
            color: '#777',
            padding: '10px 15px',
            height: '20px',
            textAlign: 'center',
            borderTop: '1px solid #e6e6e6',
            '&:before': {
                content: '\'\'',
                position: 'absolute',
                right: '0',
                bottom: '0',
                left: '0',
                height: '50px',
                overflow: 'hidden',
                boxShadow: `0 1px 1px rgba(0, 0, 0, 0.2),
                    0 8px 0 -3px #f6f6f6,
                    0 9px 1px -3px rgba(0, 0, 0, 0.2),
                    0 16px 0 -6px #f6f6f6,
                    0 17px 2px -6px rgba(0, 0, 0, 0.2)`,
            }
        },

        todoCount: {
            float: 'left',
            textAlign: 'left'
        },

        filters: {
            margin: 0,
            padding: 0,
            listStyle: 'none',
            position: 'absolute',
            right: 0,
            left: 0
        },

        filterItem: {
            display: 'inline'
        },

        linkRegular: {
            ...linkBase
        },

        linkSelected: {
            ...linkBase,
            borderColor: 'rgba(175, 47, 47, 0.2)'
        },

        clearCompleted: {
            margin: 0,
            padding: 0,
            border: 0,
            background: 'none',
            fontSize: '100%',
            verticalAlign: 'baseline',
            appearance: 'none',

            float: 'right',
            position: 'relative',
            lineHeight: '20px',
            textDecoration: 'none',
            cursor: 'pointer',

            '&:hover': {
                textDecoration: 'underline'
            }
        }
    }
}
TodoFooterTheme.theme = true

export default function TodoFooterView(
    {todoService, todoFilterService}: {
        todoService: TodoService;
        todoFilterService: TodoFilterService;
    },
    {theme}: {
        theme: NamesOf<typeof TodoFooterTheme>;
    }
) {
    if (!todoService.activeTodoCount && !todoService.completedCount) {
        return null
    }
    const filter = todoFilterService.filter

    return <footer class={theme.footer}>
        <span class={theme.todoCount}>
            <strong>{todoService.activeTodoCount}</strong> item(s) left
        </span>
        <ul class={theme.filters}>
            {links.map((link) =>
                <li key={link.id} class={theme.filterItem}><a
                    id={`todo-filter-${link.id}`}
                    class={filter === link.id ? theme.linkSelected : theme.linkRegular}
                    href={`?todo_filter=${link.id}`}
                    onClick={createHandler(todoFilterService, link.id)}
                >{link.title}</a></li>
            )}
        </ul>
        {todoService.completedCount === 0
            ? null
            : <button
                class={theme.clearCompleted}
                onClick={() => todoService.clearCompleted()}>
                Clear completed
            </button>
        }
    </footer>
}
TodoFooterView.deps = [{theme: TodoFooterTheme}]
