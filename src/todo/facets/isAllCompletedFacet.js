/* @flow */

import type {
    TodoItem
} from 'reactive-di-todomvc/i/todoInterfaces'
import type {Collection} from 'reactive-di/i/collection'

export default function isAllCompletedFacet(
    allItems: Collection<TodoItem>
): boolean {
    return allItems.filter((item) => !item.isCompleted).length === 0
}
