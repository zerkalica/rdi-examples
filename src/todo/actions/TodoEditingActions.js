/* @flow */
import {merge} from 'reactive-di'
import type {
    TodoItem,
    TodoItemAdding,
    TodoItemEditing,
    TodoItemRec
} from 'reactive-di-todomvc/i/todoInterfaces'
import {TodoItemImpl} from 'reactive-di-todomvc/todo/models/TodoItemCollection'

export function changeAdding(adding: TodoItemAdding, rec: TodoItemRec): TodoItemAdding {
    return merge(adding, {
        item: merge(adding.item, rec)
    })
}

export function beginAdding(adding: TodoItemAdding): TodoItemAdding {
    return merge(adding, {
        item: new TodoItemImpl(),
        isAdding: true
    })
}

export function cancelAdding(adding: TodoItemAdding): TodoItemAdding {
    return merge(adding, {
        isAdding: false
    })
}

export function changeEditing(editing: TodoItemEditing, rec: TodoItemRec): TodoItemEditing {
    return merge(editing, {
        item: merge(editing.item, rec)
    })
}

export function beginEditing(editing: TodoItemEditing, currentItem: TodoItem): TodoItemEditing {
    return merge(editing, {
        item: currentItem,
        isEditing: true
    })
}

export function cancelEditing(editing: TodoItemEditing): TodoItemEditing {
    return merge(editing, {
        isEditing: false
    })
}
