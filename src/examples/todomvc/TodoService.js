// @flow
import {uuid} from '../common-todomvc'
import {action, mem, memkey} from 'lom_atom'

interface ITodoBase {
    id: string;
    completed: boolean;
    title: string;
}

export interface ITodo extends ITodoBase {
    destroy(): void;
    toggle(): void;
}

function toJson<V>(r: Response): Promise<V> {
    return r.json()
}

class TodoModel implements ITodo {
    completed: boolean
    _title: string
    id: string

    _store: TodoService

    constructor(todo?: $Shape<ITodoBase> = {}, store: TodoService) {
        this._title = todo.title || ''
        this.id = todo.id || uuid()
        this.completed = todo.completed || false
        this._store = store
    }

    get title(): string {
        return this._title
    }

    set title(t: string) {
        this._title = t
        this._store.saveTodo(this.toJSON())
    }

    destroy() {
        this._store.remove(this.id)
    }

    toggle() {
        this.completed = !this.completed
        this._store.saveTodo(this.toJSON())
    }

    toJSON(): ITodoBase {
        return ({
            completed: this.completed,
            title: this._title,
            id: this.id
        })
    }
}

interface ITodoExtInfo {
    description: string;
}

export default class TodoService {
    @mem opCount = 0

    get isOperationRunning(): boolean {
        return this.opCount !== 0
    }
    @memkey todoExtInfo(id: string, info?: ITodoExtInfo | Error): ITodoExtInfo {
        if (info !== undefined && !(info instanceof Error)) return info
        fetch(`/api/todo/${id}/info`, {method: 'GET'})
            .then(toJson)
            .then((info: ITodoExtInfo) => {
                this.todoExtInfo(id, info)
            })
            .catch((error: Error) => {
                this.todoExtInfo(id, error)
            })

        throw new mem.Wait()
    }

    @mem get todos(): ITodo[] {
        fetch('/api/todos', {
            method: 'GET'
        })
            .then(toJson)
            .then((todos: ITodoBase[]) => {
                this.todos = todos.map((todo: ITodoBase) => new TodoModel(todo, this))
            })
            .catch((e: Error) => {
                this.todos = e
            })
        throw new mem.Wait()
    }

    @mem set todos(todos: ITodo[] | Error) {}

    @mem get activeTodoCount(): number {
        return this.todos.reduce(
            (sum: number, todo: ITodo) => sum + (todo.completed ? 0 : 1),
            0
        )
    }

    get completedCount(): number {
        return this.todos.length - this.activeTodoCount
    }

    _handlePromise<V>(p: Promise<V>): Promise<void> {
        this.opCount++
        return p
            .then(() => {
                this.opCount--
            })
            .catch((e: Error) => {
                this.opCount--
                this.todos = e
            })
    }

    addTodo(title: string) {
        const todo = new TodoModel({title}, this)
        this.todos = this.todos.concat([todo])
        this._handlePromise(
            fetch('/api/todo', {
                method: 'PUT',
                body: JSON.stringify(todo)
            })
                .then(toJson)
                .then((updatedTodo: ITodoBase) => {
                    this.todos = this.todos.map(
                        (t: ITodo) => t.id === todo.id
                            ? new TodoModel(updatedTodo, this)
                            : t
                    )
                })
        )
    }

    saveTodo(todo: ITodoBase) {
        this.todos = this.todos.map(
            (t: ITodo) => t.id === todo.id
                ? new TodoModel(todo, this)
                : t
        )
        this._handlePromise(
            fetch(`/api/todo/${todo.id}`, {
                method: 'POST',
                body: JSON.stringify(todo)
            })
                .then(toJson)
                .then((updatedTodo: ITodoBase) => {
                    this.todos = this.todos.map(
                        (t: ITodo) => t.id === todo.id
                            ? new TodoModel(updatedTodo, this)
                            : t
                    )
                })
        )
    }

    @action remove(id: string) {
        this.todos = this.todos.filter((todo: ITodo) => todo.id !== id)

        this._handlePromise(
            fetch(`/api/todo/${id}`, {
                method: 'DELETE'
            })
        )
    }

    @action toggleAll() {
        this.todos = this.todos.map(
            (todo: ITodo) => new TodoModel({
                title: todo.title,
                id: todo.id,
                completed: true
            }, this)
        )

        this._handlePromise(
            fetch(`/api/todos`, {
                method: 'PUT',
                body: JSON.stringify(
                    this.todos.map(
                        (todo: ITodo) => ([todo.id, {completed: true}])
                    )
                )
            })
        )
    }

    clearCompleted() {
        const newTodos: ITodo[] = []
        const delIds: string[] = []
        for (let i = 0; i < this.todos.length; i++) {
            const todo = this.todos[i]
            if (todo.completed) {
                delIds.push(todo.id)
            } else {
                newTodos.push(todo)
            }
        }
        this.todos = newTodos

        this._handlePromise(
            fetch(`/api/todos`, {
                method: 'DELETE',
                body: JSON.stringify(delIds)
            })
        )
    }
}
