// @flow
import {action, mem} from 'lom_atom'
import {props} from 'reactive-di'
import {Fetcher} from '../../../fetcher'
import AbstractLocationStore from '../../../rdi/AbstractLocationStore'
import Todo from './Todo'
import type {ITodoRepository, ITodoData} from './Todo'

type ITogglePatch = [string, $Shape<ITodoData>]

export const TODO_FILTER = {
    ALL: 'all',
    COMPLETE: 'complete',
    ACTIVE: 'active'
}

export type IFilter = $Values<typeof TODO_FILTER>

export default class TodoRepository implements ITodoRepository {
    _fetcher: Fetcher
    _location: AbstractLocationStore
    // @props props: {}
    constructor(fetcher: Fetcher, location: AbstractLocationStore) {
        this._fetcher = fetcher
        this._location = location
    }

    @mem get todos(): Todo[] {
        return this._fetcher.get('/todos').json()
            .map((data: ITodoData) => new Todo(data, this))
    }
    set todos(todos: Todo[]) {}

    @mem get activeTodoCount(): number {
        return this.todos.reduce(
            (sum: number, todo: Todo) => sum + (todo.completed ? 0 : 1),
            0
        )
    }

    get completedCount(): number {
        return this.todos.length - this.activeTodoCount
    }

    remove(todo: Todo) {
        this._fetcher.delete(`/todo/${todo.id}`).json()
        this.todos = this.todos.filter(t => t.id !== todo.id)
    }

    update(next: Todo) {
        this._fetcher.post(`/todo/${next.id}`).json(next)
        this.todos = this.todos.map(t => t.id === next.id ? next : t)
    }

    @mem get adding(): ?Todo {
        return null
    }

    @mem set adding(next: Todo) {
        this._fetcher.put('/todo').json(next)
        this.todos = [...this.todos, next]
        mem.cache(this.adding)
    }

    @action addTodo(title: string) {
        this.adding = new Todo({title}, this)
    }

    @mem get patching(): ?ITogglePatch[] {
        return null
    }

    @mem set patching(patches: ?ITogglePatch[]) {
        this._fetcher.put(`/todos`).json(patches)
        const patchMap = new Map(patches)
        this.todos = this.todos.map(todo => todo.copy(patchMap.get(todo.id)))
        mem.cache(this.patching)
    }

    @action toggleAll() {
        const todos = this.todos
        const completed = !!todos.find(todo => !todo.completed)
        this.patching = todos.map(todo => ([todo.id, {completed}]))
    }

    @mem get clearing(): ?string[] {
        return null
    }

    @mem set clearing(delIds: string[]) {
        this._fetcher.delete(`/todos`).json(delIds)
        const delSet = new Set(delIds)
        this.todos = this.todos.filter(todo => !delSet.has(todo.id))
        mem.cache(this.clearing)
    }

    @action clearCompleted() {
        this.clearing = this.todos.filter(todo => todo.completed).map(todo => todo.id)
    }

    get filter(): IFilter {
        return this._location.location('todo_filter') || TODO_FILTER.ALL
    }

    set filter(filter: IFilter) {
        return this._location.location('todo_filter', filter)
    }

    @mem get filteredTodos(): Todo[] {
        const todos = this.todos
        switch (this.filter) {
            case TODO_FILTER.ALL:
                return todos
            case TODO_FILTER.COMPLETE:
                return todos.filter(todo => !!todo.completed)
            case TODO_FILTER.ACTIVE:
                return todos.filter(todo => !todo.completed)
            default:
                throw new Error(`Unknown filter value: ${this.filter}`)
        }
    }
}
