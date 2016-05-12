/* @flow */
import type {Operation} from 'reactive-di-observable'
import type {
    TodoItem,
    TodoItemRec
} from 'reactive-di-todomvc/todo'

import m from 'reactive-di-todomvc/common/helpers/merge'

import {TodoItemImpl} from 'reactive-di-todomvc/todo/models/TodoItemCollection'
import TodoItemAdding from 'reactive-di-todomvc/todo/models/TodoItemAdding'
import TodoItemEditing from 'reactive-di-todomvc/todo/models/TodoItemEditing'

export function changeAdding(
    adding: TodoItemAdding,
    /* @args */ rec: TodoItemRec
): Array<Operation> {
    return [
        {
            object: m(adding, {
                errors: {},
                item: m(adding.item, rec)
            })
        }
    ]
}

export function beginAdding(adding: TodoItemAdding): Array<Operation> {
    return [
        {
            object: m(adding, {
                item: new TodoItemImpl(),
                isAdding: true
            })
        }
    ]
}

export function cancelAdding(adding: TodoItemAdding): Array<Operation> {
    return [
        {
            object: m(adding, {
                isAdding: false
            })
        }
    ]
}

export function changeEditing(
    editing: TodoItemEditing,
    /* @args */ rec: TodoItemRec
): Array<Operation> {
    return [
        {
            object: m(editing, {
                errors: {},
                item: m(editing.item, rec)
            })
        }
    ]
}

export function beginEditing(
    editing: TodoItemEditing,
    /* @args */ currentItem: TodoItem
): Array<Operation> {
    return [
        {
            object: m(editing, {
                item: currentItem,
                isEditing: true
            })
        }
    ]
}

export function cancelEditing(editing: TodoItemEditing): Array<Operation> {
    return [
        {
            object: m(editing, {
                isEditing: false
            })
        }
    ]
}
