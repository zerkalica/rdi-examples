/* @flow */
import type {FetchParams} from 'reactive-di-todomvc/common/i'
import type {TodoItem} from 'reactive-di-todomvc/todo/i'

import AbstractStorage from 'reactive-di-todomvc/common/services/AbstractStorage'

export type ServerAction<V> = { // eslint-disable-line
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    url: RegExp;
    execute(storage: AbstractStorage, params: FetchParams<V>, match: Array<string>): () => any;
}

import HttpError from 'reactive-di-todomvc/common/errors/HttpError'

const defaultTodos: Array<TodoItem> = [
    {
        id: 't1',
        title: 'test todo #1',
        isCompleted: false
    },
    {
        id: 't2',
        title: 'test todo #2',
        isCompleted: true
    }
];

function findByKeys(data: Object, criteria: Object): boolean {
    const keys = Object.keys(criteria)
    return keys.filter(
        (prop: string) => data[prop] !== criteria[prop]
    ).length !== 0
}

const defaultLogin = {
    isAuthorized: false
}

const serverActions: Array<ServerAction> = [
    {
        method: 'GET',
        url: new RegExp('/session'),
        execute<V>(storage: AbstractStorage, params: FetchParams<V>, match: Array<string>): () => any { // eslint-disable-line
            const data = storage.getItem('session');
            return () => (data || defaultLogin)
        }
    },

    {
        method: 'PUT',
        url: new RegExp('/session'),
        execute(storage: AbstractStorage, params: FetchParams, match: Array<string>): () => any { // eslint-disable-line
            const data: Object = params.json || {}
            return () => {
                if (data.password !== 'admin') {
                    throw new HttpError(400, 'invalid login or password')
                }
                storage.setItem('session', {isAuthorized: true});

                return {
                    sessionId: '123213124345346'
                }
            }
        }
    },

    {
        method: 'DELETE',
        url: new RegExp('/session'),
        execute<V>(storage: AbstractStorage, params: FetchParams<V>, match: Array<string>): () => any { // eslint-disable-line
            const data = storage.setItem('session', {isAuthorized: false});
            return () => (data || defaultLogin)
        }
    },

    {
        method: 'GET',
        url: new RegExp('/todos'),
        execute<V>(storage: AbstractStorage, params: FetchParams<V>, match: Array<string>): () => any { // eslint-disable-line
            const data: ?Array<TodoItem> = storage.getItem('todos');
            return () => {
                const session = storage.getItem('session')
                if (!session || !session.isAuthorized) {
                    throw new HttpError(403, 'not authorized')
                }
                return (data || defaultTodos)
            }
        }
    },
    {
        method: 'POST',
        url: new RegExp('/todos'),
        execute(storage: AbstractStorage, params: FetchParams, match: Array<string>): () => any { // eslint-disable-line
            const data: ?Array<TodoItem> = storage.getItem('todos');
            const todos = data || defaultTodos;

            const newTodos = todos.map((todo) => ({
                ...todo,
                ...params.json
            }))

            return () => {
                const session = storage.getItem('session')
                if (!session || !session.isAuthorized) {
                    throw new HttpError(403, 'not authorized')
                }
                storage.setItem('todos', newTodos)
                return null
            }
        }
    },
    {
        method: 'DELETE',
        url: new RegExp('/todos'),
        execute(storage: AbstractStorage, params: FetchParams, match: Array<string>): () => any { // eslint-disable-line
            const data: ?Array<TodoItem> = storage.getItem('todos');

            const todos = data || defaultTodos;

            const newTodos = todos.filter((todo) => findByKeys(todo, (params.json: any)))
            return () => {
                const session = storage.getItem('session')
                if (!session || !session.isAuthorized) {
                    throw new HttpError(403, 'not authorized')
                }
                storage.setItem('todos', newTodos)
                return null
            }
        }
    },
    {
        method: 'DELETE',
        url: new RegExp('/todo/(.*)'),
        execute<V>(storage: AbstractStorage, params: FetchParams<V>, match: Array<string>): () => any { // eslint-disable-line
            const data: ?Array<TodoItem> = storage.getItem('todos');
            const todos = data || []
            const id = match[1]
            const newTodos = todos.filter((todo) => todo.id !== id)

            return () => {
                const session = storage.getItem('session')
                if (!session || !session.isAuthorized) {
                    throw new HttpError(403, 'not authorized')
                }
                storage.setItem('todos', newTodos)
                return null
            }
        }
    },
    {
        method: 'POST',
        url: new RegExp('/todo/(.*)'),
        execute(storage: AbstractStorage, params: FetchParams, match: Array<string>): () => any { // eslint-disable-line
            const data: ?Array<TodoItem> = storage.getItem('todos');
            const todos = data || []
            const id = match[1]
            const newTodos = todos.map((todo) =>
                todo.id === id
                    ? params.json
                    : todo
            )

            return () => {
                const session = storage.getItem('session')
                if (!session || !session.isAuthorized) {
                    throw new HttpError(403, 'not authorized')
                }
                storage.setItem('todos', newTodos)
                return params.json
            }
        }
    },
    {
        method: 'PUT',
        url: new RegExp('/todo'),
        execute(storage: AbstractStorage, params: FetchParams, match: Array<string>): () => any { // eslint-disable-line
            const data: ?Array<TodoItem> = storage.getItem('todos');
            const todos = data || []
            todos.push((params.json: any))

            return () => {
                const session = storage.getItem('session')
                if (!session || !session.isAuthorized) {
                    throw new HttpError(403, 'not authorized')
                }
                storage.setItem('todos', todos)
                return {
                    ...params.json,
                    id: `${(params.json: any).id}.saved`
                }
            }
        }
    }
];

export default serverActions
