// @flow
import {action} from 'lom_atom'
import {theme} from 'reactive-di'
import TodoRepository, {TODO_FILTER} from './models/TodoRepository'
import AbstractLocationStore from '../../rdi/AbstractLocationStore'

class TodoFooterService {
    _repository: TodoRepository
    links = [
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

    constructor(repository: TodoRepository) {
        this._repository = repository
    }

    @action clickLink(e: Event) {
        e.preventDefault()
        this._repository.filter = (e.target: any).dataset.linkid
    }

    @theme get css() {
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
                        0 17px 2px -6px rgba(0, 0, 0, 0.2)`
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
                // appearance: 'none',

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

    link(isSelected: boolean) {
        return isSelected ? this.css.linkSelected : this.css.linkRegular
    }
}

export default function TodoFooterView(
    _: {},
    {
        todoRepository: {completedCount, activeTodoCount, filter, clearing, clearCompleted},
        todoFooterService,
        locationStore
    }: {
        locationStore: AbstractLocationStore;
        todoRepository: TodoRepository;
        todoFooterService: TodoFooterService;
    }
) {
    const {links, clickLink, css} = todoFooterService
    if (activeTodoCount === 0 && completedCount === 0) {
        return null
    }

    return <footer rdi_theme class={css.footer}>
        <span class={css.todoCount} id="count">
            <strong id="number">{activeTodoCount}</strong> item(s) left
        </span>
        <ul class={css.filters} id="filters">
            {links.map(link => <li
                    key={link.id}
                    class={css.filterItem}
                    id={`link(${link.id})`}
                ><a
                    id={`link(${link.id}).a`}
                    class={todoFooterService.link(filter === link.id)}
                    href={locationStore.toUrl({todo_filter: link.id})}
                    data-linkid={link.id}
                    onClick={clickLink}
                >{link.title}</a>
            </li>)}
        </ul>
        {completedCount === 0
            ? null
            : <button
                id="clear"
                class={css.clearCompleted}
                disabled={clearing}
                onClick={clearCompleted}>
                Clear completed
            </button>
        }
    </footer>
}
