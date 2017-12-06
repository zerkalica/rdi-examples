// @flow
import {action, mem, AtomWait} from 'lom_atom'

import Fetcher from '../../../Fetcher'
import {uuid} from '../../common-todomvc'

export interface ITodoData {
    id: string;
    completed: boolean;
    title: string;
}

export interface ITodoRepository {
    _fetcher: Fetcher;
    todos: Todo[];
}

export default class Todo implements ITodoData {
    completed: boolean
    _title: string
    id: string

    _store: ITodoRepository
    _fetcher: Fetcher

    constructor(todo?: $Shape<ITodoData> = {}, store: ITodoRepository) {
        this._title = todo.title || ''
        this.id = todo.id || uuid()
        this.completed = todo.completed || false
        this._store = store
        this._fetcher = store._fetcher
    }

    get title(): string {
        return this._title
    }

    set title(t: string) {
        if (this._title === t) return
        this._title = t

        this.saving = new Todo({
            ...this.toJSON(),
            title: t
        }, this._store)
    }

    @mem get saving(): ?Todo {
        return null
    }

    @mem set saving(next: Todo) {
        this._fetcher.post(`/todo/${this.id}`).json(next)

        const store = this._store
        // mem.cache(store.todos) // Reload from server
        store.todos = store.todos.map(t => t.id === next.id ? next : t)

        mem.cache(this.saving = (null: any))
    }

    @action toggle() {
        this.saving = new Todo({
            ...this.toJSON(),
            completed: !this.completed
        }, this._store)
    }

    @mem get removing(): boolean {
        return false
    }

    @mem set removing(next: boolean) {
        this._fetcher.delete(`/todo/${this.id}`).json()

        const store = this._store
        // mem.cache(store.todos) // Reload from server
        store.todos = store.todos.filter(t => t.id !== this.id)
        mem.cache(this.removing = false)
    }

    @action remove() {
        this.removing = true
    }

    toJSON(): ITodoData {
        return {
            completed: this.completed,
            title: this._title,
            id: this.id
        }
    }
}
