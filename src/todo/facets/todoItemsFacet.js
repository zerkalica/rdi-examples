/* @flow */
import {factory} from 'reactive-di/annotations'

import type {
    TodoItem,
    TodoItemsFacet
} from 'reactive-di-todomvc/todo/i'
import TodoQueryArgs from 'reactive-di-todomvc/todo/facets/TodoQueryArgs'
import TodoItemCollection from 'reactive-di-todomvc/todo/models/TodoItemCollection'

export default function todoItemsFacet(
    allItems: TodoItemCollection,
    groupState: TodoQueryArgs
): TodoItemsFacet {
    let items: ?Array<TodoItem>;
    switch (groupState.selectedGroup) {
        case 'all':
            items = allItems.items
            break
        case 'completed':
            items = allItems.items.filter((item: TodoItem) => item.isCompleted)
            break
        case 'active':
            items = allItems.items.filter((item: TodoItem) => !item.isCompleted)
            break
        default:
            throw new Error('Unhandlered group')
    }

    return {
        items,
        error: groupState.error,
        hasCompleted: !!items.find((item: TodoItem) => item.isCompleted),
        totalCount: allItems.length,
        itemsCount: items.length,
        selectedGroup: groupState.selectedGroup
    }
}
factory()(todoItemsFacet)
