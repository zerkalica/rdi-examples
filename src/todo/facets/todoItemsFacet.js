/* @flow */

import type {
    TodoItem,
    TodoItemsFacet
} from 'reactive-di-todomvc/i/todoInterfaces'
import type {Collection} from 'reactive-di/i/collection'
import TodoQueryArgs from 'reactive-di-todomvc/todo/facets/TodoQueryArgs'

export default function todoItemsFacet(
    allItems: Collection<TodoItem>,
    groupState: TodoQueryArgs
): TodoItemsFacet {
    let items: ?Collection<TodoItem>;
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
            items = []
            break
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
