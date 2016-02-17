/* @flow */

import rdi from 'reactive-di-todomvc/common/annotations'
import {merge} from 'reactive-di'
import TodoItemAdding from 'reactive-di-todomvc/todo/models/TodoItemAdding'
import TodoItemEditing from 'reactive-di-todomvc/todo/models/TodoItemEditing'
import type {TodoItem, TodoEditingRec} from 'reactive-di-todomvc/i/todoInterfaces'

export function assignAdding(item: TodoItem, rec: TodoEditingRec): TodoItem {
    return merge(item, rec)
}
rdi.setter(TodoItemAdding)(assignAdding)

export function assignEditing(item: TodoItem, rec: TodoEditingRec): TodoItem {
    return merge(item, rec)
}
rdi.setter(TodoItemEditing)(assignEditing)

export function beginEditing(item: TodoItem, currentItem: TodoItem): TodoItem {
    return merge(item, currentItem)
}
rdi.setter(TodoItemEditing)(beginEditing)

export function cancelEditing(item: TodoItem): TodoItem {
    return merge(item, {id: ''})
}
rdi.setter(TodoItemEditing)(cancelEditing)
