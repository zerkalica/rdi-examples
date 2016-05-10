/* @flow */

import type {TodoItem} from 'reactive-di-todomvc/i/todoInterfaces'

import {observable} from 'reactive-di-observable/annotations'
import {TodoItemImpl} from 'reactive-di-todomvc/todo/models/TodoItemCollection'

@observable()
export default class TodoItemEditing {
    isEditing: boolean;
    item: TodoItem;
    errors: {[id: string]: string};

    constructor(rec: {
        isEditing?: boolean,
        item?: TodoItem,
        errors?: {[id: string]: string}
    } = {}) {
        this.errors = rec.errors || {}
        this.item = rec.item || new TodoItemImpl()
        this.isEditing = rec.isEditing || false
    }
}
