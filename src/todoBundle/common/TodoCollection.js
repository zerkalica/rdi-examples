// @flow

import {hooks, source} from 'reactive-di/annotations'
import {Updater, IndexCollection} from 'reactive-di'
import type {ResultOf} from 'reactive-di'
import {createFetch} from 'rdi-fetcher'
import Todo from './Todo'

@source({key: 'TodoCollection'})
export default class TodoCollection extends IndexCollection {
    static Item = Todo
}

@hooks(TodoCollection)
class TodoCollectionHooks {
    _todoUpdater: Updater<TodoCollection>

    constructor(
        todos: TodoCollection,
        fetch: ResultOf<typeof createFetch>
    ) {
        this._todoUpdater = new Updater({
            value: todos,
            promise(): Promise<TodoCollection> {
                return fetch('/todo', {
                    method: 'GET'
                })
            }
        })
    }

    willMount() {
        this._todoUpdater.run()
    }

    willUnmount() {
        this._todoUpdater.abort()
    }
}
