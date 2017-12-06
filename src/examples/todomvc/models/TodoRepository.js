// @flow
import {action, mem, AtomWait} from 'lom_atom'

import Fetcher from '../../../Fetcher'
import {AbstractLocationStore} from '../../common-todomvc'
import Todo from './Todo'
import type {ITodoRepository} from './Todo'

type ITogglePatch = [string, $Shape<Todo>]

export const TODO_FILTER = {
    ALL: 'all',
    COMPLETE: 'complete',
    ACTIVE: 'active'
}

export type IFilter = $Values<typeof TODO_FILTER>

export default class TodoRepository implements ITodoRepository {
    _fetcher: Fetcher
    _location: AbstractLocationStore

    constructor(fetcher: Fetcher, location: AbstractLocationStore) {
        this._fetcher = fetcher
        this._location = location
    }

    @mem get todos(): Todo[] {
        return this._fetcher.get('/todos').json()
            .map(todo => new Todo(todo, this))
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

    @mem get adding(): ?Todo {
        return null
    }

    @mem set adding(next: Todo) {
        this._fetcher.put('/todo').json(next)
        this.todos = [...this.todos, next]
        mem.cache(this.adding = (null: any))
    }

    @action addTodo(title: string) {
        this.adding = new Todo({title}, this)
    }

    @mem get patching(): ?ITogglePatch[] {
        return null
    }

    @mem set patching(patches: ITogglePatch[]) {
        const map = new Map(patches)
        const newTodos = this.todos.map(
            (todo: Todo) => new Todo({
                title: todo.title,
                id: todo.id,
                completed: map.has(todo.id)
                    ? (map.get(todo.id): any).completed
                    : todo.completed
            }, this)
        )
        this._fetcher.put(`/todos`).json(patches)

        this.todos = newTodos
        mem.cache(this.patching = (null: any))
    }

    @action toggleAll() {
        const completed = !!this.todos.find((todo) => !todo.completed)
        this.patching = this.todos.map(
            (todo: Todo) => ([todo.id, {completed}])
        )
    }

    @mem get clearing(): ?Todo[] {
        return null
    }

    @mem set clearing(todos: Todo[]) {
        const delIds: string[] = []
        const newTodos: Todo[] = []
        for (let i = 0; i < todos.length; i++) {
            const todo = todos[i]
            if (todo.completed) {
                delIds.push(todo.id)
            } else {
                newTodos.push(todo)
            }
        }

        this._fetcher.delete(`/todos`).json(delIds)
        this.todos = newTodos
        mem.cache(this.clearing = (null: any))
    }

    @action clearCompleted() {
        this.clearing = this.todos
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
