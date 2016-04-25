/* @flow */
import {TodoItemImpl} from 'reactive-di-todomvc/todo/models/TodoItemCollection'
import type {TodoItem} from 'reactive-di-todomvc/i/todoInterfaces'
import {assignBoolean} from 'reactive-di-todomvc/common/helpers'

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
        this.isEditing = assignBoolean(rec.isEditing)
    }
}
