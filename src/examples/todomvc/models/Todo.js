// @flow
import {action, mem, AtomWait} from 'lom_atom'

import {uuid} from '../../common-todomvc'

export interface ITodoData {
    id: string;
    completed: boolean;
    title: string;
}

export interface ITodoRepository {
    update(todo: Todo): void;
    remove(todo: Todo): void;
}

export default class Todo implements ITodoData {
    completed: boolean
    title: string
    id: string

    _store: ITodoRepository

    constructor(todo?: $Shape<ITodoData> = {}, store: ITodoRepository) {
        this.title = todo.title || ''
        this.id = todo.id || uuid()
        this.completed = todo.completed || false
        this._store = store
    }

    copy(data?: ?$Shape<ITodoData>): Todo {
        return data
            ? new Todo({...this.toJSON(), ...data}, this._store)
            : this
    }

    @action update(data?: $Shape<ITodoData>) {
        this.saving = this.copy(data)
    }

    @mem get saving(): ?Todo {
        return null
    }

    @mem set saving(next: Todo) {
        this._store.update(next)
        mem.cache(this.saving)
    }

    @mem get removing(): boolean {
        return false
    }

    @mem set removing(next: boolean) {
        this._store.remove(this)
        mem.cache(this.removing)
    }

    @action remove() {
        this.removing = true
    }

    @action toggle() {
        this.update({completed: !this.completed})
    }

    toJSON(): ITodoData {
        return {
            completed: this.completed,
            title: this.title,
            id: this.id
        }
    }
}
