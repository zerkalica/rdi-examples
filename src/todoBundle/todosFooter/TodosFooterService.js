// @flow

import {getSrc} from 'reactive-di'
import {actions} from 'reactive-di/annotations'
import type {ResultOf} from 'reactive-di'
import {RouterManager} from 'modern-router'

import {createFetch} from 'rdi-fetcher'

import TodoCollection from 'rdi-todo/todoBundle/common/TodoCollection'
import TodoFilterParams from 'rdi-todo/todoBundle/common/TodoFilterParams'
import Todo from 'rdi-todo/todoBundle/common/Todo'

function filterNotCompleted(todo: Todo): boolean {
    return !todo.isCompleted
}

@actions
export default class TodosFooterService {
    indexUrl: string
    activeUrl: string
    completedUrl: string

    _fetch: ResultOf<typeof createFetch>
    _values: TodoCollection
    _params: TodoFilterParams

    constructor(
        params: TodoFilterParams,
        rm: RouterManager,
        values: TodoCollection,
        fetch: ResultOf<typeof createFetch>
    ) {
        this.indexUrl = rm.build('index')
        this.activeUrl = rm.build('TodosPage', {group: 'active'})
        this.completedUrl = rm.build('TodosPage', {group: 'completed'})
        this._params = params
        this._values = values
        this._fetch = fetch
    }

    showAll() {
        getSrc(this._params).merge({selectedGroup: 'all'})
    }

    showActive() {
        getSrc(this._params).merge({selectedGroup: 'active'})
    }

    showCompleted() {
        getSrc(this._params).merge({selectedGroup: 'completed'})
    }

    clearCompleted() {
        const fetch = this._fetch
        const values = this._values
        values.filter(filterNotCompleted)
        getSrc(values).update({
            run(): Promise<void> {
                return fetch('/todos', {
                    method: 'DELETE',
                    body: {
                        isCompleted: true
                    }
                }).then(() => {})
            }
        })
    }
}
