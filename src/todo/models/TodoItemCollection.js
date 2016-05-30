/* @flow */

import type {TodoItem} from 'reactive-di-todomvc/todo/i'

import BaseCollection from 'reactive-di-todomvc/common/helpers/BaseCollection'

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
        this.id = rec.id || ''
        this.title = rec.title || this.id
        this.isCompleted = rec.isCompleted || false
    }
}

export default class TodoItemCollection extends BaseCollection<TodoItem> {
    createItem(rec: TodoItemRec): TodoItem {
        return new TodoItemImpl(rec)
    }
}
