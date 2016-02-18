/* @flow */
import rdi from 'reactive-di-todomvc/common/annotations'
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

const serverActions: Array<ServerAction> = [
    {
        method: 'GET',
        url: new RegExp('/todos'),
        execute<V>(storage: Storage, params: FetchParams<V>, match: Array<string>): Promise<V> { // eslint-disable-line
            const dataStr: ?string = storage.getItem('todos');
            return Promise.resolve(dataStr ? JSON.parse(dataStr) : defaultTodos)
        }
    },
    {
        method: 'DELETE',
        url: new RegExp('/todo/(.*?)'),
        execute<V>(storage: Storage, params: FetchParams<V>, match: Array<string>): Promise<V> { // eslint-disable-line
            const dataStr: ?string = storage.getItem('todos');
            const todos = dataStr ? JSON.parse(dataStr) : []
            const id = match[1]
            const newTodos = todos.filter((todo) => todo.id === id)
            storage.setItem('todos', JSON.stringify(newTodos))

            return Promise.resolve(newTodos)
        }
    },
    {
        method: 'POST',
        url: new RegExp('/todo/(.*?)'),
        execute<V>(storage: Storage, params: FetchParams<V>, match: Array<string>): Promise<V> { // eslint-disable-line
            const dataStr: ?string = storage.getItem('todos');
            const todos = dataStr ? JSON.parse(dataStr) : []
            const id = match[1]
            const newTodos = todos.map((todo) =>
                todo.id === id
                    ? params.json
                    : todo
            )
            storage.setItem('todos', JSON.stringify(newTodos))

            return Promise.resolve(newTodos)
        }
    },
    {
        method: 'PUT',
        url: new RegExp('/todo'),
        execute<V>(storage: Storage, params: FetchParams<V>, match: Array<string>): Promise<V> { // eslint-disable-line
            const dataStr: ?string = storage.getItem('todos');
            const todos = dataStr ? JSON.parse(dataStr) : []
            todos.push(params.json)
            storage.setItem('todos', JSON.stringify(todos))
            return Promise.resolve(todos)
        }
    }

];

function createLocalServerActions(): Array<ServerAction> {
    return serverActions
}
export default rdi.factory()(createLocalServerActions)
