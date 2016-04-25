/* @flow */

import type {
    TodoItem,
    TodoItemsFacet
} from 'reactive-di-todomvc/i/todoInterfaces'
import TodoQueryArgs from 'reactive-di-todomvc/todo/facets/TodoQueryArgs'

export default function todoItemsFacet(
    allItems: Array<TodoItem>,
    groupState: TodoQueryArgs
): TodoItemsFacet {
    let items: Array<TodoItem>;
    switch (groupState.selectedGroup) {
        case 'all':
            items = allItems
            break
        case 'completed':
            items = allItems.filter((item: TodoItem) => item.isCompleted)
            break
        case 'active':
            items = allItems.filter((item: TodoItem) => !item.isCompleted)
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
