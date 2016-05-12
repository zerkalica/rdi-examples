/* @flow */

import type {TodoItem} from 'reactive-di-todomvc/todo'

import {TodoItemImpl} from 'reactive-di-todomvc/todo/models/TodoItemCollection'

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
