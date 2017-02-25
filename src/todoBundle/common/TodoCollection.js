// @flow

import {hooks, source} from 'reactive-di/annotations'
import {getSrc, IndexCollection} from 'reactive-di'
import type {ResultOf} from 'reactive-di'
import {createFetch} from 'rdi-fetcher'
import Todo from './Todo'

@source({key: 'TodoCollection'})
export default class TodoCollection extends IndexCollection {
    static Item = Todo
    static autoNotify = true
}

@hooks(TodoCollection)
class TodoCollectionHooks {
    _abort: () => void
    _fetch: ResultOf<typeof createFetch>

    constructor(
        fetch: ResultOf<typeof createFetch>
    ) {
        this._fetch = fetch
    }

    willMount(todos: TodoCollection) {
        const fetch = this._fetch
        this._abort = getSrc(todos).update({
            run(): Promise<TodoCollection> {
                return fetch('/todos', {
                    method: 'GET'
                })
            }
        })
    }

    willUnmount() {
        this._abort()
    }
}
