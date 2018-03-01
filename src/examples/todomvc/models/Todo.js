// @flow
import {action, mem, AtomWait} from 'lom_atom'
import uuid from '../../../rdi/uuid'

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
    completed: boolean = false
    title: string = ''
    id: string = uuid()

    _store: ITodoRepository

    constructor(todo?: $Shape<ITodoData>, store: ITodoRepository) {
        Object.assign(this, todo)
        // Hide from JSON.stringify
        Object.defineProperties(this, {
            _store: {value: store}
        })
    }

    copy(data: ?$Shape<ITodoData>): Todo {
        return new Todo({...(this: ITodoData), ...data}, this._store)
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
}
