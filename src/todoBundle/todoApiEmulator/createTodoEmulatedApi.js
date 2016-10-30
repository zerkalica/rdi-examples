// @flow

import shortId from 'shortid'
import {EmulatedApi} from 'rdi-api-emulator'
import {HttpError} from 'rdi-fetcher'
import type {FetchOptions} from 'rdi-fetcher'
import {AbstractStorage} from 'rdi-helpers'
import Todo from 'rdi-todo/todoBundle/common/Todo'

const defaultTodos: Todo[] = [
    new Todo({
        id: 't1',
        title: 'test todo #1',
        isCompleted: false
    }),
    new Todo({
        id: 't2',
        title: 'test todo #2',
        isCompleted: true
    })
]

const defaultLogin = {
    isAuthorized: false
}

function findByKeys(data: {[id: string]: mixed}, criteria: {[id: string]: mixed}): boolean {
    const keys = Object.keys(criteria)
    return keys.filter(
        (prop: string) => data[prop] !== criteria[prop]
    ).length !== 0
}

function getBody(body?: ?(string | Object)): Object {
    return typeof body === 'string'
        ? JSON.parse(body)
        : ((body || {}): any)
}

function sortByDate(el1: Todo, el2: Todo): number {
    if (String(el1.created) > String(el2.created)) {
        return 1
    }
    if (String(el1.created) < String(el2.created)) {
        return -1
    }
    return 0
}

export default function createTodoEmulatedApi(
    storage: AbstractStorage
) {
    function assertAuth() {
        const session = storage.get('session')
        if (session && !session.isAuthorized) {
            throw new HttpError(403, 'Not authorized')
        }
    }

    return new EmulatedApi([
        {
            method: 'GET',
            url: new RegExp('/session'),
            execute(params: FetchOptions, match: string[]): Promise<*> { // eslint-disable-line
                const data = storage.get('session')
                return Promise.resolve(data || defaultLogin)
            }
        },

        {
            method: 'PUT',
            url: new RegExp('/session'),
            execute(params: FetchOptions, match: string[]): Promise<*> { // eslint-disable-line
                return new Promise((resolve: Function, reject: Function) => {
                    const data = getBody(params.body)
                    if (data.password !== 'admin') {
                        reject(new HttpError(400, 'invalid login or password'))
                        return
                    }
                    storage.set('session', {isAuthorized: true})

                    resolve({
                        sessionId: '123213124345346'
                    })
                })
            }
        },

        {
            method: 'GET',
            url: new RegExp('/todos'),
            execute(params: FetchOptions, match: string[]): Promise<*> { // eslint-disable-line
                return new Promise((resolve: Function) => {
                    assertAuth()
                    let newTodos = storage.get('todos')
                    if (!newTodos) {
                        newTodos = defaultTodos
                        storage.set('todos', newTodos)
                    }
                    resolve(newTodos.sort(sortByDate))
                })
            }
        },
        {
            method: 'POST',
            url: new RegExp('/todos'),
            execute(params: FetchOptions, match: string[]): Promise<*> { // eslint-disable-line
                return new Promise((resolve: Function) => {
                    assertAuth()
                    const data: ?Todo[] = storage.get('todos')
                    const todos = data || defaultTodos
                    const newTodos = todos
                        .map((todo: Todo) => ({
                            ...todo,
                            ...getBody(params.body)
                        }))
                        .sort(sortByDate)
                    storage.set('todos', newTodos)
                    resolve(newTodos)
                })
            }
        },
        {
            method: 'DELETE',
            url: new RegExp('/todos'),
            execute(params: FetchOptions, match: string[]): Promise<*> { // eslint-disable-line
                return new Promise((resolve: Function) => {
                    assertAuth()
                    const data: ?Todo[] = storage.get('todos')
                    const todos = data || defaultTodos
                    const newTodos = todos.filter((todo: Todo) =>
                        findByKeys(todo, getBody(params.body))
                    )
                    storage.set('todos', newTodos)
                    resolve(null)
                })
            }
        },
        {
            method: 'DELETE',
            url: new RegExp('/todo/(.*)'),
            execute(params: FetchOptions, match: string[]): Promise<*> { // eslint-disable-line
                return new Promise((resolve: Function) => {
                    assertAuth()
                    const data: ?Todo[] = storage.get('todos')
                    const todos = data || []
                    const id = match[1]
                    const newTodos = todos.filter((todo: Todo) => todo.id !== id)
                    storage.set('todos', newTodos.sort(sortByDate))
                    resolve(null)
                })
            }
        },
        {
            method: 'POST',
            url: new RegExp('/todo/(.*)'),
            execute(params: FetchOptions, match: string[]): Promise<*> { // eslint-disable-line
                return new Promise((resolve: Function) => {
                    assertAuth()
                    const data: ?Todo[] = storage.get('todos')
                    const id = match[1]
                    const body = getBody(params.body)
                    const newTodos = (data || []).map(
                        (todo: Todo) => (todo.id === id ? body : todo)
                    )
                    storage.set('todos', newTodos)
                    resolve(body)
                })
            }
        },
        {
            method: 'PUT',
            url: new RegExp('/todo'),
            execute(params: FetchOptions, match: string[]): Promise<*> { // eslint-disable-line
                return new Promise((resolve: Function) => {
                    assertAuth()
                    const data: ?Todo[] = storage.get('todos')
                    const todos = data || []
                    const body = getBody(params.body)
                    const newTodo = {
                        ...body,
                        id: shortId.generate()
                    }
                    todos.push(newTodo)
                    storage.set('todos', todos)
                    resolve(newTodo)
                })
            }
        }
    ])
}
