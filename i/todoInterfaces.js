/* @flow */

import type {Collection} from 'reactive-di/i/collection'

export type TodoItem = {
    id: string;
    title: string;
    isCompleted: boolean;
};

export type TodoItemEditing = {
    item: TodoItem;
    errors: {[id: string]: ?string};
    isEditing: boolean;
}

export type TodoItemAdding = {
    item: TodoItem;
    errors: {[id: string]: ?string};
    isEditing: boolean;
}

export type TodoItemRec = {
    title?: string;
    isCompleted?: boolean;
}

export type SelectedGroup = 'all' | 'active' | 'completed';

export type TodoItemsFacet = {
    items: Collection<TodoItem>;
    hasCompleted: boolean;
    itemsCount: number;
    selectedGroup: SelectedGroup;
}
