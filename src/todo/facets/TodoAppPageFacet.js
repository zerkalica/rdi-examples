/* @flow */

import type {Collection} from 'reactive-di/i/collection'
import type {EntityMeta} from 'reactive-di/i/nodeInterfaces'

import rdi from 'reactive-di-todomvc/common/annotations'
import TodoGroupState from 'reactive-di-todomvc/todo/models/TodoGroupState'
import TodoItemCollectionLoader from 'reactive-di-todomvc/todo/loaders/TodoItemCollectionLoader'
import TodoCrudActionsImpl from 'reactive-di-todomvc/todo/actions/TodoCrudActions'
import TodoFilterActionsImpl from 'reactive-di-todomvc/todo/actions/TodoFilterActions'
import type {
    SelectedGroup,
    TodoFilterActions,
    TodoCrudActions,
    TodoItem
} from 'reactive-di-todomvc/i/todoInterfaces'

export type TodoAppPageProps = {
    filterActions: TodoFilterActions;
    crudActions: TodoCrudActions;
    addTodo: (item: TodoItem) => void;

    items: Collection<TodoItem>;
    itemsCount: number;

    isAllCompleted: boolean;
    selectedGroup: SelectedGroup;
    hasCompleted: boolean;
    meta: EntityMeta;
};

// implements TodoAppPageProps
class TodoAppPageFacet {
    filterActions: TodoFilterActions;
    crudActions: TodoCrudActions;
    addTodo: (item: TodoItem) => void;

    items: Collection<TodoItem>;
    itemsCount: number;

    isAllCompleted: boolean;
    selectedGroup: SelectedGroup;
    hasCompleted: boolean;

    constructor(
        items: Collection<TodoItem>,
        groupState: TodoGroupState,
        crudActions,
        filterActions
    ) {
        this.itemsCount = items.length
        this.isAllCompleted = groupState.isAllCompleted
        this.selectedGroup = groupState.selectedGroup
        this.crudActions = crudActions
        this.filterActions = filterActions

        switch (groupState.selectedGroup) {
            case 'all':
                this.items = items
                break
            case 'completed':
                this.items = items.filter((item: TodoItem) => item.isCompleted)
                break
            case 'active':
                this.items = items.filter((item: TodoItem) => !item.isCompleted)
                break
            default:
                throw new Error(`Unknown selectedGroup: ${groupState.selectedGroup}`)
        }

        this.hasCompleted = !!items.find((item: TodoItem) => item.isCompleted)
    }
}

export default rdi.klass(
    TodoItemCollectionLoader,
    TodoGroupState,
    rdi.factory(TodoCrudActionsImpl)((actions) => actions),
    rdi.factory(TodoFilterActionsImpl)((actions) => actions),
)(TodoAppPageFacet)
