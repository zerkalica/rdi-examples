/* @flow */

import m from 'reactive-di-todomvc/common/helpers/merge'
import createId from 'reactive-di-todomvc/common/helpers/createId'
import TodoGroupState from 'reactive-di-todomvc/todo/models/TodoGroupState'
import TodoItemCollection, {TodoItemImpl} from 'reactive-di-todomvc/todo/models/TodoItemCollection'
import Fetcher from 'reactive-di-todomvc/common/services/Fetcher'
import TodoItemEditing from 'reactive-di-todomvc/todo/models/TodoItemEditing'
import TodoItemAdding from 'reactive-di-todomvc/todo/models/TodoItemAdding'

import type {TodoItem} from 'reactive-di-todomvc/i/todoInterfaces'
import type {Operation} from 'reactive-di-observable/i/interfaces'

function empty(): Array<Operation> {
    return []
}

export function toggleAll(
    todos: TodoItemCollection,
    groupState: TodoGroupState,
    fetcher: Fetcher
): Array<Operation> {
    const isCompleted = !groupState.isAllCompleted
    return [
        {object: todos.update(null, (item) => m(item, {isCompleted}))},
        {object: m(groupState, {isAllCompleted: isCompleted})},
        {
            promise: () => fetcher.load('todos', {
                method: 'POST',
                json: {
                    isCompleted
                }
            }).then(empty)
        }
    ]
}

export function clearCompleted(
    items: TodoItemCollection,
    fetcher: Fetcher
): Array<Operation> {
    return [
        {object: items.filter((item) => !item.isCompleted)},
        {
            promise: () => fetcher.load(`todos`, {
                method: 'DELETE',
                json: {
                    isCompleted: true
                }
            }).then(empty)
        }
    ]
}

export function removeTodoItem(
    items: TodoItemCollection,
    fetcher: Fetcher,
    id: string
): Array<Operation> {
    return [
        {object: items.remove(id)},
        {
            promise: () => fetcher.load(`todo/${id}`, {
                method: 'DELETE'
            }).then(empty)
        }
    ]
}

export function toggleTodoItem(
    items: TodoItemCollection,
    fetcher: Fetcher,
    id: string
): Array<Operation> {
    const newItems = items.update(
        id,
        (item: TodoItem) => m(item, {isCompleted: !item.isCompleted})
    );

    return [
        {object: newItems},
        {
            promise: () => fetcher.load(`todo/${id}`, {
                method: 'POST',
                json: newItems.get(id)
            })
            .then(empty)
        }
    ]
}

function getTodoItemAddingErrors(newItem: TodoItem): {
    isError: boolean,
    errors: {[id: string]: string}
} {
    const errors = {}
    if (!newItem.title) {
        errors.title = 'Need todo title'
    }

    return {
        isError: !newItem.title,
        errors
    }
}

export function commitEditing(
    todos: TodoItemCollection,
    todoItemEditing: TodoItemEditing,
    fetcher: Fetcher,
    newItem: TodoItem
): Array<Operation> {
    const {isError, errors} = getTodoItemAddingErrors(newItem)
    if (isError) {
        return [
            {object: m(todoItemEditing, {errors})}
        ]
    }

    return [
        {
            object: todos.set(newItem.id, newItem)
        },
        {
            object: m(todoItemEditing, {
                isEditing: false,
                errors
            })
        },
        {
            promise: () => fetcher.load(`todo/${newItem.id}`, {
                method: 'POST',
                json: newItem
            })
            .then(empty)
        }
    ]
}

export function commitAdding(
    todos: TodoItemCollection,
    todoItemAdding: TodoItemAdding,
    fetcher: Fetcher,
    newItem: TodoItem
): Array<Operation> {
    const ni = new TodoItemImpl({
        ...newItem,
        id: createId()
    })
    const {isError, errors} = getTodoItemAddingErrors(newItem)
    if (isError) {
        return [
            {object: m(todoItemAdding, {errors})}
        ]
    }

    const newItems = todos.add(ni)
    const transaction: Array<Operation> = [
        {object: newItems},
        {
            object: m(todoItemAdding, {
                errors,
                item: m(todoItemAdding.item, {
                    title: ''
                })
            })
        }
    ];

    if (!isError) {
        transaction.push({
            promise: () => fetcher.load('todo', {
                method: 'PUT',
                json: ni
            }).then(({id}) => ([
                {object: newItems.set(ni.id, m(ni, {id}))}
            ]))
        })
    }

    return transaction
}
