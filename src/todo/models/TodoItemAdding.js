/* @flow */
import {TodoItemImpl} from 'reactive-di-todomvc/todo/models/TodoItemCollection'
import type {TodoItem} from 'reactive-di-todomvc/i/todoInterfaces'

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
