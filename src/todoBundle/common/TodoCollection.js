// @flow

import {hooks, source} from 'reactive-di/annotations'
import {Updater} from 'reactive-di'
import type {ResultOf} from 'reactive-di'
import {BaseCollection} from 'rdi-helpers'
import {createFetch} from 'rdi-fetcher'
import type {TodoRec} from './Todo'
import Todo from './Todo'

export class TodoCollectionUpdater extends Updater {
    static pending = true
}

@source({key: 'TodoCollection'})
export default class TodoCollection extends BaseCollection<Todo> {
    static Updater = TodoCollectionUpdater

    createItem(rec: TodoRec): Todo {
        return new Todo(rec)
    }
}

@hooks(TodoCollection)
class TodoCollectionHooks {
    _updater: Updater
    _fetch: ResultOf<typeof createFetch>

    constructor(
        updater: TodoCollectionUpdater,
        fetch: ResultOf<typeof createFetch>
    ) {
        this._updater = updater
        this._fetch = fetch
    }

    onMount() {
        const load = () => this._fetch('/todos', {
            method: 'GET'
        }).then((data: TodoRec[]) => [new TodoCollection(data)])
        this._updater.set([load])
    }
}
