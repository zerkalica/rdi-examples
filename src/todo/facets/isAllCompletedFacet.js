/* @flow */

import type {
    IsAllCompleted
} from 'reactive-di-todomvc/todo'

import TodoItemCollection from 'reactive-di-todomvc/todo/models/TodoItemCollection'

export default function isAllCompletedFacet(
    allItems: TodoItemCollection
): IsAllCompleted {
    return allItems.filter((item) => !item.isCompleted).length === 0
}
