// @flow
import Fetcher from '../../Fetcher'
import type {FetcherApi} from '../../Fetcher'
import {uuid} from '../common-todomvc'
import {action, mem, AtomWait} from 'lom_atom'

interface ITodoData {
    id: string;
    completed: boolean;
    title: string;
}

export interface ITodo extends ITodoData {
    remove(): void;
    toggle(): void;
    update(data: ITodoData): void;
}

function toJson<V>(r: Response): Promise<V> {
    return r.json()
}

class TodoModel implements ITodo {
    completed: boolean
    _title: string
    id: string

    _store: TodoService

    constructor(todo?: $Shape<ITodoData> = {}, store: TodoService) {
        this._title = todo.title || ''
        this.id = todo.id || uuid()
        this.completed = todo.completed || false
        this._store = store
    }

    get title(): string {
        return this._title
    }

    set title(t: string) {
        if (this._title === t) return
        this._title = t
        this._store.saveTodo(this.toJSON())
    }

    remove() {
        this._store.remove(this)
    }

    toggle() {
        this.completed = !this.completed
        this._store.saveTodo(this.toJSON())
    }

    update(data: ITodoData) {
        this._store.saveTodo(data)
    }

    toJSON(): ITodoData {
        return {
            completed: this.completed,
            title: this._title,
            id: this.id
        }
    }
}

interface ITodoExtInfo {
    description: string;
}

type ITogglePatch = [string, $Shape<ITodo>]

export default class TodoService {
    _fetcher: Fetcher

    constructor(fetcher: Fetcher) {
        this._fetcher = fetcher
    }

    @mem get todos(): ITodo[] {
        return this._fetcher.request('/todos').json()
            .map((todo: ITodoData) => new TodoModel(todo, this))
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

    @mem get adding(): ?ITodo {
        return null
    }

    @mem set adding(next: ITodo) {
        this._fetcher
            .request('/todo')
            .json(next)
            .valueOf()
        this.todos = [...this.todos, next]
        mem.cache(this.adding = (null: any))
    }

    addTodo(title: string) {
        this.adding = new TodoModel({title}, this)
    }

    @mem get saving(): ?ITodo {
        return null
    }

    @mem set saving(next: ITodo) {
        this._fetcher
            .request(`/todo/${next.id}`)
            .postOptions({method: 'POST'})
            .json(next)
            .valueOf()

        this.todos = this.todos.map(
            (t: ITodo) => t.id === next.id
                ? next
                : t
        )

        mem.cache(this.saving = (null: any))
    }

    saveTodo(todoData: ITodoData) {
        const todo = new TodoModel(todoData, this)
        this.saving = todo
    }

    @mem get removing(): ?ITodo {
        return null
    }
    @mem set removing(next: ITodo) {
        this._fetcher
            .request(`/todo/${next.id}`)
            .getOptions({method: 'DELETE'})
            .json()
            .valueOf()
        this.todos = this.todos.filter((t: ITodo) => t.id !== next.id)
        mem.cache(this.removing = (null: any))
    }

    remove(todo: ITodo) {
        this.removing = todo
    }

    @mem get patching(): ?ITogglePatch[] {
        return null
    }

    @mem set patching(patches: ITogglePatch[]) {
        this._fetcher
            .request(`/todos`)
            .postOptions({method: 'PUT'})
            .json(patches)
            .valueOf()
        const map = new Map(patches)
        this.todos = this.todos.map(
            (todo: ITodo) => new TodoModel({
                title: todo.title,
                id: todo.id,
                completed: map.has(todo.id) ? todo.completed : (map.get(todo.id): any).completed
            }, this)
        )
        mem.cache(this.patching = (null: any))
    }

    @action toggleAll() {
        const completed = !!this.todos.find((todo) => !todo.completed)
        const patches: ITogglePatch[] = this.todos.map(
            (todo: ITodo) => ([todo.id, {completed}])
        )

        this.patching = patches
    }

    @mem get clearing(): ?ITodo[] {
        return null
    }
    @mem set clearing(todos: ITodo[]) {
        const delIds: string[] = []
        const newTodos: ITodo[] = []
        for (let i = 0; i < todos.length; i++) {
            const todo = todos[i]
            if (todo.completed) {
                delIds.push(todo.id)
            } else {
                newTodos.push(todo)
            }
        }

        this._fetcher
            .request(`/todos`)
            .postOptions({method: 'DELETE'})
            .json(delIds)
            .valueOf()
        this.todos = newTodos
        mem.cache(this.clearing = (null: any))
    }

    clearCompleted() {
        this.clearing = this.todos
    }

    @mem get isOperationRunning(): boolean {
        let count = 0
        if (this.adding) count++
        if (this.saving) count++
        if (this.removing) count++
        if (this.patching) count++
        if (this.clearing) count++
        return count !== 0
    }
}
