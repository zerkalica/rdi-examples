/* @flow */

import rdi from '../../common/annotations'
import {merge} from 'reactive-di'
import TodoItemAdding from '../models/TodoItemAdding'
import TodoItemEditing from '../models/TodoItemEditing'
import type {TodoItem, TodoEditingRec} from '../interfaces'

export function assignAdding(item: TodoItem, rec: TodoEditingRec): TodoItem {
    return merge(item, rec)
}
rdi.setter(TodoItemAdding)(assignAdding)

export function assignEditing(item: TodoItem, rec: TodoEditingRec): TodoItem {
    return merge(item, rec)
}
rdi.setter(TodoItemEditing)(assignEditing)

export function beginEditing(item: TodoItem, id: string): TodoItem {
    return merge(item, {id})
}
rdi.setter(TodoItemEditing)(beginEditing)

export function cancelEditing(item: TodoItem): TodoItem {
    return merge(item, {id: ''})
}
rdi.setter(TodoItemEditing)(cancelEditing)
