/* @flow */
import type {FetchParams} from 'reactive-di-todomvc/i/commonInterfaces'
import type {TodoItem} from 'reactive-di-todomvc/i/todoInterfaces'

export type ServerAction<V> = { // eslint-disable-line
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    url: RegExp;
    execute(storage: Storage, params: FetchParams<V>, match: Array<string>): Promise<V>;
}

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
function delayedResult<V>(getData: () => V): Promise<V> {
    return new Promise((resolve, reject) => {
        if ((Math.random() * 2) > 1.5) {
            setTimeout(() => reject(new Error('Fake server error')), 700)
        } else {
            setTimeout(() => {
                resolve(getData())
            }, 700)
        }
    })
}

function findByKeys(data: Object, criteria: Object): boolean {
    const keys = Object.keys(criteria)
    return keys.filter(
        (prop: string) => data[prop] !== criteria[prop]
    ).length !== 0
}

const serverActions: Array<ServerAction> = [
    {
        method: 'GET',
        url: new RegExp('/todos'),
        execute<V>(storage: Storage, params: FetchParams<V>, match: Array<string>): Promise<V> { // eslint-disable-line
            const dataStr: ?string = storage.getItem('todos');
            return delayedResult(() => dataStr ? JSON.parse(dataStr) : defaultTodos)
        }
    },
    {
        method: 'POST',
        url: new RegExp('/todos'),
        execute<V>(storage: Storage, params: FetchParams<V>, match: Array<string>): Promise<null> { // eslint-disable-line
            const dataStr: ?string = storage.getItem('todos');
            const todos = dataStr ? JSON.parse(dataStr) : defaultTodos;
            const newTodos = todos.map((todo) => ({
                ...todo,
                ...params.json
            }))
            return delayedResult(() => {
                storage.setItem('todos', JSON.stringify(newTodos))
                return null
            })
        }
    },
    {
        method: 'DELETE',
        url: new RegExp('/todos'),
        execute<V>(storage: Storage, params: FetchParams<V>, match: Array<string>): Promise<null> { // eslint-disable-line
            const dataStr: ?string = storage.getItem('todos');
            const todos = dataStr ? JSON.parse(dataStr) : defaultTodos;
            const newTodos = todos.filter((todo) => findByKeys(todo, params.json))
            return delayedResult(() => {
                storage.setItem('todos', JSON.stringify(newTodos))
                return null
            })
        }
    },
    {
        method: 'DELETE',
        url: new RegExp('/todo/(.*)'),
        execute<V>(storage: Storage, params: FetchParams<V>, match: Array<string>): Promise<null> { // eslint-disable-line
            const dataStr: ?string = storage.getItem('todos');
            const todos = dataStr ? JSON.parse(dataStr) : []
            const id = match[1]
            const newTodos = todos.filter((todo) => todo.id !== id)

            return delayedResult(() => {
                storage.setItem('todos', JSON.stringify(newTodos))
                return null
            })
        }
    },
    {
        method: 'POST',
        url: new RegExp('/todo/(.*)'),
        execute<V>(storage: Storage, params: FetchParams<V>, match: Array<string>): Promise<V> { // eslint-disable-line
            const dataStr: ?string = storage.getItem('todos');
            const todos = dataStr ? JSON.parse(dataStr) : []
            const id = match[1]
            const newTodos = todos.map((todo) =>
                todo.id === id
                    ? params.json
                    : todo
            )

            return delayedResult(() => {
                storage.setItem('todos', JSON.stringify(newTodos))
                return params.json
            })
        }
    },
    {
        method: 'PUT',
        url: new RegExp('/todo'),
        execute<V>(storage: Storage, params: FetchParams<V>, match: Array<string>): Promise<V> { // eslint-disable-line
            const dataStr: ?string = storage.getItem('todos');
            const todos = dataStr ? JSON.parse(dataStr) : []
            todos.push(params.json)

            return delayedResult(() => {
                storage.setItem('todos', JSON.stringify(todos))
                return {
                    ...params.json,
                    id: `${params.json.id}.saved`
                }
            })
        }
    }
];

export default serverActions
