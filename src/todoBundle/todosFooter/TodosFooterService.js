// @flow

import {Updater} from 'reactive-di'
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

    _updater: Updater<TodoCollection>
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
        this._updater = new Updater({
            value: values,
            promise(): Promise<void> {
                return fetch('/todos', {
                    method: 'DELETE',
                    body: {
                        isCompleted: true
                    }
                }).then(() => {})
            }
        })
        this._params = params
        this._values = values
    }

    showAll() {
        this._params.set({selectedGroup: 'all'})
    }

    showActive() {
        this._params.set({selectedGroup: 'active'})
    }

    showCompleted() {
        this._params.set({selectedGroup: 'completed'})
    }

    clearCompleted() {
        this._updater.run()
        this._values.filter(filterNotCompleted)
    }
}
