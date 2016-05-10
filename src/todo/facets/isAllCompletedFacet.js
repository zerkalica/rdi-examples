/* @flow */
import {factory} from 'reactive-di/annotations'

import TodoItemCollection from 'reactive-di-todomvc/todo/models/TodoItemCollection'

function isAllCompletedFacet(
    allItems: TodoItemCollection
): boolean {
    return allItems.filter((item) => !item.isCompleted).length === 0
}

export default factory(isAllCompletedFacet)
