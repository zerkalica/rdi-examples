/* @flow */

import rdi from 'reactive-di-todomvc/common/annotations'

import {BaseCollection} from 'reactive-di'
import type {Collection} from 'reactive-di/i/collection' // eslint-disable-line
import {assignString, assignBoolean} from 'reactive-di-todomvc/common/helpers'

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
        this.id = assignString(rec.id)
        this.title = assignString(rec.title)
        this.isCompleted = assignBoolean(rec.isCompleted)
    }
}

// implements Collection<TodoItem>
class TodoItemCollection extends BaseCollection<TodoItem> {
    createItem(rec: TodoItemRec): TodoItem {
        return new TodoItemImpl(rec)
    }
}
export default rdi.model(TodoItemCollection)
