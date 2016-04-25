/* @flow */

import type {
    TodoItem
} from 'reactive-di-todomvc/i/todoInterfaces'

export default function isAllCompletedFacet(
    allItems: Array<TodoItem>
): boolean {
    return allItems.filter((item) => !item.isCompleted).length === 0
}
