/* @flow */

import TodoItemCollection from 'reactive-di-todomvc/todo/models/TodoItemCollection'

export default function isAllCompletedFacet(
    allItems: TodoItemCollection
): boolean {
    return allItems.filter((item) => !item.isCompleted).length === 0
}
