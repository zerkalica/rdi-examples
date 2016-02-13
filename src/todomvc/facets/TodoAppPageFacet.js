/* @flow */

import type {Collection} from 'reactive-di/interfaces/collectionInterfaces'

import rdi from '../../common/annotations'
import TodoGroupState from '../models/TodoGroupState'
import TodoItemCollection from '../models/TodoItemCollection'
import {
    add,
    remove,
    toggle,
    change,
    toggleAll,
    clearCompleted
} from '../actions/TodoCrudActions'
import {
    showAll,
    showActive,
    showCompleted
} from '../actions/TodoFilterActions'
import type {
    SelectedGroup,
    TodoFilterActions,
    TodoCrudActions,
    TodoItem
} from '../interfaces'

export type TodoAppPageProps = {
    filterActions: TodoFilterActions;
    crudActions: TodoCrudActions;
    addTodo: (item: TodoItem) => void;

    items: Collection<TodoItem>;
    itemsCount: number;

    isAllCompleted: boolean;
    selectedGroup: SelectedGroup;
    hasCompleted: boolean;
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

        add,
        remove,
        toggle,
        change,
        toggleAll,
        clearCompleted,

        showAll,
        showActive,
        showCompleted
    ) {
        this.items = items
        this.itemsCount = items.length
        this.isAllCompleted = groupState.isAllCompleted
        this.selectedGroup = groupState.selectedGroup

        this.crudActions = {
            add,
            remove,
            toggle,
            change,
            toggleAll,
            clearCompleted
        }

        this.filterActions = {
            showAll,
            showActive,
            showCompleted
        }
        this.hasCompleted = !!items.find(item => item.isCompleted)
    }
}

export default rdi.klass(
    TodoItemCollection,
    TodoGroupState,

    add,
    remove,
    toggle,
    change,
    toggleAll,
    clearCompleted,

    showAll,
    showActive,
    showCompleted
)(TodoAppPageFacet)
