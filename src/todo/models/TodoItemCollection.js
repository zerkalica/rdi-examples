/* @flow */

import BaseCollection from 'reactive-di-todomvc/common/helpers/BaseCollection'
import {assignString, assignBoolean} from 'reactive-di-todomvc/common/helpers'

import type {TodoItem} from 'reactive-di-todomvc/i/todoInterfaces'

export type TodoItemRec = {
    id?: string;
    title?: string;
    isCompleted?: boolean;
}

// implements TodoItem
export class TodoItemImpl {
    id: string;
    title: string;
    isCompleted: boolean;

    constructor(rec: TodoItemRec = {}) {
        this.id = assignString(rec.id)
        this.title = assignString(rec.title)
        this.isCompleted = assignBoolean(rec.isCompleted)
    }
}

export default class TodoItemCollection extends BaseCollection<TodoItem> {
    createItem(rec: TodoItemRec): TodoItem {
        return new TodoItemImpl(rec)
    }
}
