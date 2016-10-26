// @flow

import type {ResultOf} from 'reactive-di'
import {RouterManager} from 'modern-router'

import {createFetch} from 'rdi-fetcher'
import TodoCollection, {TodoCollectionUpdater} from 'rdi-todo/core/models/TodoCollection'
import Todo from 'rdi-todo/core/models/Todo'

function filterNotCompleted(todo: Todo): boolean {
    return !todo.isCompleted
}

export default class TodosFooterService {
    indexUrl: string
    activeUrl: string
    completedUrl: string

    _updater: TodoCollectionUpdater
    _rm: RouterManager
    _values: TodoCollection
    _fetch: ResultOf<typeof createFetch>

    constructor(
        rm: RouterManager,
        updater: TodoCollectionUpdater,
        values: TodoCollection,
        fetch: ResultOf<typeof createFetch>
    ) {
        this.indexUrl = rm.build('index')
        this.activeUrl = rm.build('TodosPage', {group: 'active'})
        this.completedUrl = rm.build('TodosPage', {group: 'completed'})
        this._rm = rm
        this._updater = updater
        this._values = values
        this._fetch = fetch
    }

    showAll = () => {
        this._rm.update(null, {
            group: 'all'
        })
    }

    showActive = () => {
        this._rm.update(null, {
            group: 'active'
        })
    }

    showCompleted = () => {
        this._rm.update(null, {
            group: 'completed'
        })
    }

    _doFetch = () => {
        return this._fetch('/todos', {
            method: 'DELETE',
            body: {
                isCompleted: true
            }
        }).then(() => {})
    }

    clearCompleted = () => {
        this._updater.set([
            this._values.filter(filterNotCompleted),
            this._doFetch
        ])
    }
}
