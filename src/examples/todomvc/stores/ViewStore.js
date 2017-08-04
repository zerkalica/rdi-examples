// @flow

import {mem} from 'lom_atom'

import type {ITodo} from './TodoStore'
import TodoStore from './TodoStore'
import {AbstractLocationStore} from '../../common'

export const TODO_FILTER = {
    ALL: 'all',
    COMPLETE: 'complete',
    ACTIVE: 'active'
}

export type IFilter = $Values<typeof TODO_FILTER>

export default class ViewStore {
    _todoStore: TodoStore
    _locationStore: AbstractLocationStore

    static deps = [TodoStore, AbstractLocationStore]

    constructor(todoStore: TodoStore, locationStore: AbstractLocationStore) {
        this._todoStore = todoStore
        this._locationStore = locationStore
    }

    get filter(): IFilter {
        return this._locationStore.location('todo_filter') || TODO_FILTER.ALL
    }

    set filter(filter: IFilter) {
        return this._locationStore.location('todo_filter', filter)
    }

    @mem get filteredTodos(): ITodo[] {
        const todos = this._todoStore.todos
        switch (this.filter) {
            case TODO_FILTER.ALL:
                return todos
            case TODO_FILTER.COMPLETE:
                return todos.filter((todo: ITodo) => !!todo.completed)
            case TODO_FILTER.ACTIVE:
                return todos.filter((todo: ITodo) => !todo.completed)
            default:
                throw new Error(`Unknown filter value: ${this.filter}`)
        }
    }
}
