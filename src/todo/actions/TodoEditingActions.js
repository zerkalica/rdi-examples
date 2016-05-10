/* @flow */
import m from 'reactive-di-todomvc/common/helpers/merge'
import type {
    TodoItem,
    TodoItemAdding,
    TodoItemEditing,
    TodoItemRec
} from 'reactive-di-todomvc/i/todoInterfaces'
import {TodoItemImpl} from 'reactive-di-todomvc/todo/models/TodoItemCollection'
import type {Operation} from 'reactive-di-observable/i/interfaces'
import {setter} from 'reactive-di-observable/annotations'

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
setter(changeAdding)

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
setter(beginAdding)

export function cancelAdding(adding: TodoItemAdding): Array<Operation> {
    return [
        {
            object: m(adding, {
                isAdding: false
            })
        }
    ]
}
setter(cancelAdding)

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
setter(changeEditing)

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
setter(beginEditing)

export function cancelEditing(editing: TodoItemEditing): Array<Operation> {
    return [
        {
            object: m(editing, {
                isEditing: false
            })
        }
    ]
}
setter(cancelEditing)
