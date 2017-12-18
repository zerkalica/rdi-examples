// @flow

import BrowserLocalStorage from '../../rdi/BrowserLocalStorage'
import uuid from '../../rdi/uuid'

interface ITodo {
    id: string;
    title: string;
    completed: boolean;
    created: Date;
}

function getBody(body?: ?(string | Object)): any {
    return typeof body === 'string'
        ? JSON.parse(body)
        : ((body || {}): any)
}

function sortByDate(el1: ITodo, el2: ITodo): number {
    if (!el2.created || el1.created) {
        return 0
    }

    if (String(el1.created) > String(el2.created)) {
        return 1
    }
    if (String(el1.created) < String(el2.created)) {
        return -1
    }
    return 0
}

export default function todoMocks(rawStorage: Storage) {
    const storage = new BrowserLocalStorage(rawStorage, 'lom_todomvc')
    const infos = new BrowserLocalStorage(rawStorage, 'lom_todomvc_info')
    const defaultTodos: ITodo[] = [
        {
            id: 't1',
            title: 'test todo #1',
            completed: false,
            created: new Date()
        },
        {
            id: 't2',
            title: 'test todo #2',
            completed: true,
            created: new Date()
        }
    ]

    return [
        {
            method: 'GET',
            matcher: new RegExp('/api/todos'),
            response(url: string, params: RequestOptions) {
                let newTodos = storage.get()
                if (!newTodos) {
                    newTodos = defaultTodos
                    storage.set(newTodos)
                }
                return newTodos.sort(sortByDate)
            }
        },
        {
            method: 'GET',
            matcher: new RegExp('/api/todo/(.*)/info'),
            response(url: string, params: RequestOptions, id: string) {
                const data = infos.get() || []
                const i = data.find((inf) => inf.id === id)
                return {id, description: i ? i.description : 'desc'}
            }
        },
        {
            method: 'PUT',
            matcher: new RegExp('/api/todos'),
            response(url: string, params: RequestOptions) {
                const data: ?ITodo[] = storage.get()
                const todos = data || defaultTodos
                const updates: Map<string, $Shape<ITodo>> = new Map(getBody(params.body))

                const newTodos = todos
                    .map(todo => {
                        return {...todo, ...updates.get(todo.id)}
                    })
                    .sort(sortByDate)
                storage.set(newTodos)

                return newTodos
            }
        },
        {
            method: 'DELETE',
            matcher: new RegExp('/api/todos'),
            response(url: string, params: RequestOptions) {
                const data: ?ITodo[] = storage.get()
                const todos = data || defaultTodos
                const ids: string[] = getBody(params.body)
                const newTodos = todos.filter(todo =>
                    ids.indexOf(todo.id) === -1
                )
                storage.set(newTodos)

                return newTodos.map(({id}) => id)
            }
        },
        {
            method: 'DELETE',
            matcher: new RegExp('/api/todo/(.*)'),
            response(url: string, params: RequestOptions, id: string) {
                const data: ?ITodo[] = storage.get()
                const todos = data || []
                const newTodos = todos.filter(todo => todo.id !== id)
                storage.set(newTodos.sort(sortByDate))

                return {id}
            }
        },
        {
            method: 'POST',
            matcher: new RegExp('/api/todo/(.*)'),
            response(url: string, params: RequestOptions, id: string) {
                const data: ?ITodo[] = storage.get()
                const newTodo = getBody(params.body)
                const newTodos = (data || []).map(todo => (todo.id === id ? newTodo : todo))
                storage.set(newTodos)

                return newTodo
            }
        },
        {
            method: 'PUT',
            matcher: new RegExp('/api/todo'),
            response(url: string, params: RequestOptions) {
                const todos = storage.get() || []
                const body = getBody(params.body)
                const id = uuid()

                const newTodo = {
                    ...body,
                    id
                }
                todos.push(newTodo)
                storage.set(todos)
                infos.set((infos.get() || []).concat([{id, description: 'desc#' + id}]))
                return newTodo
            }
        }
    ]
}
