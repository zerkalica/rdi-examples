/* @flow */

import rdi from 'reactive-di-todomvc/common/annotations'
import {merge} from 'reactive-di'
import TodoItemAdding from 'reactive-di-todomvc/todo/models/TodoItemAdding'
import TodoItemEditing from 'reactive-di-todomvc/todo/models/TodoItemEditing'
import type {TodoItem, TodoEditingRec} from 'reactive-di-todomvc/i/todoInterfaces'

function assignAdding(item: TodoItem, rec: TodoEditingRec): TodoItem {
    return merge(item, rec)
}

function assignEditing(item: TodoItem, rec: TodoEditingRec): TodoItem {
    return merge(item, rec)
}

function beginEditing(item: TodoItem, currentItem: TodoItem): TodoItem {
    return merge(item, currentItem)
}

function cancelEditing(item: TodoItem): TodoItem {
    return merge(item, {id: ''})
}

export default {
    assignAdding: rdi.setter(TodoItemAdding)(assignAdding),
    assignEditing: rdi.setter(TodoItemEditing)(assignEditing),
    beginEditing: rdi.setter(TodoItemEditing)(beginEditing),
    cancelEditing: rdi.setter(TodoItemEditing)(cancelEditing)
}
