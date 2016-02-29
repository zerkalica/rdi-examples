/* @flow */
import {TodoItemImpl} from 'reactive-di-todomvc/todo/models/TodoItemCollection'
import type {TodoItem} from 'reactive-di-todomvc/i/todoInterfaces'
import {assignModel, assignBoolean} from 'reactive-di-todomvc/common/helpers'

export default class TodoItemAdding {
    isAdding: boolean;
    todoItem: TodoItem;

    constructor(rec: {
        isAdding: boolean,
        todoItem: TodoItem
    }) {
        this.todoItem = assignModel(rec.todoItem, TodoItemImpl)
        this.isAdding = assignBoolean(rec.isAdding)
    }
}
