// @flow

import {EmulatedApi} from 'rdi-api-emulator'
import {HttpError} from 'rdi-fetcher'
import type {FetchOptions} from 'rdi-fetcher'
import {AbstractStorage} from 'rdi-helpers'
import Todo from 'rdi-todo/core/models/Todo'

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

export default function createTodoEmulatedApi(
    storage: AbstractStorage
) {
    function assertAuth() {
        const session = storage.get('session')
        if (!session || !session.isAuthorized) {
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
                    resolve(storage.get('todos'))
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
                    const newTodos = todos.map((todo: Todo) => ({
                        ...todo,
                        ...getBody(params.body)
                    }))
                    storage.set('todos', newTodos)
                    resolve(storage.get('todos'))
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
                    storage.set('todos', newTodos)
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
                    todos.push(body)
                    storage.set('todos', todos)
                    resolve({
                        ...body,
                        id: `${body.id}.saved`
                    })
                })
            }
        }
    ])
}
