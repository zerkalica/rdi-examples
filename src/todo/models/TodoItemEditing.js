/* @flow */
import {TodoItemImpl} from 'reactive-di-todomvc/todo/models/TodoItemCollection'
import type {TodoItem} from 'reactive-di-todomvc/i/todoInterfaces'
import {assignModel, assignBoolean} from 'reactive-di-todomvc/common/helpers'

export default class TodoItemEditing {
    isEditing: boolean;
    item: TodoItem;

    constructor(rec: {
        isEditing?: boolean,
        item?: TodoItem
    } = {}) {
        this.item = assignModel(rec.item, TodoItemImpl)
        this.isEditing = assignBoolean(rec.isEditing)
    }
}
