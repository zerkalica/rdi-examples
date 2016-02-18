/* @flow */

import rdi from 'reactive-di-todomvc/common/annotations'

import {BaseCollection} from 'reactive-di'
import type {Collection} from 'reactive-di/i/collection' // eslint-disable-line

import type {
    TodoItem
} from 'reactive-di-todomvc/i/todoInterfaces'

type TodoItemRec = {
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
        this.title = rec.title || ''
        this.isCompleted = rec.isCompleted || false
    }
}

// implements Collection<TodoItem>
class TodoItemCollection extends BaseCollection<TodoItem> {
    createItem(rec: TodoItemRec): TodoItem {
        return new TodoItemImpl(rec)
    }
}
export default rdi.asyncmodel(TodoItemCollection)
