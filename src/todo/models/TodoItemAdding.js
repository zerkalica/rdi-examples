/* @flow */
import {observable} from 'reactive-di-observable/annotations'

import type {TodoItem} from 'reactive-di-todomvc/todo/i'

import {TodoItemImpl} from 'reactive-di-todomvc/todo/models/TodoItemCollection'

@observable({key: 'TodoItemAdding'})
export default class TodoItemAdding {
    isAdding: boolean;
    item: TodoItem;
    errors: {[id: string]: string};

    constructor(rec: {
        isAdding?: boolean,
        item?: TodoItem,
        errors?: {[id: string]: string}
    } = {}) {
        this.errors = rec.errors || {}
        this.item = rec.item || new TodoItemImpl()
        this.isAdding = rec.isAdding || false
    }
}
