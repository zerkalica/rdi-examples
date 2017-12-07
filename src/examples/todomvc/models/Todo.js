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
    title: string
    id: string

    _store: ITodoRepository
    _fetcher: Fetcher

    constructor(todo?: $Shape<ITodoData> = {}, store: ITodoRepository) {
        this.title = todo.title || ''
        this.id = todo.id || uuid()
        this.completed = todo.completed || false
        this._store = store
        this._fetcher = store._fetcher
    }

    copy(data?: ?$Shape<ITodoData>): Todo {
        return data
            ? new Todo({...this.toJSON(), ...data}, this._store)
            : this
    }

    @action update(data: $Shape<ITodoData>) {
        this.saving = this.copy(data)
    }

    @mem get saving(): ?Todo {
        return null
    }

    @mem set saving(next: Todo) {
        this._fetcher.post(`/todo/${this.id}`).json(next)

        const store = this._store
        // mem.cache(store.todos) // Reload from server
        store.todos = store.todos.map(t => t.id === next.id ? next : t)

        mem.cache(this.saving)
    }

    @action toggle() {
        this.update({completed: !this.completed})
    }

    @mem get removing(): boolean {
        return false
    }

    @mem set removing(next: boolean) {
        this._fetcher.delete(`/todo/${this.id}`).json()

        const store = this._store
        // mem.cache(store.todos) // Reload from server
        store.todos = store.todos.filter(t => t.id !== this.id)
        mem.cache(this.removing)
    }

    @action remove() {
        this.removing = true
    }

    toJSON(): ITodoData {
        return {
            completed: this.completed,
            title: this.title,
            id: this.id
        }
    }
}
