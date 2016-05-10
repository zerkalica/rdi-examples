/* @flow */

import type {Collection} from 'reactive-di/i/collection'
import QueryError from 'reactive-di-todomvc/common/errors/QueryError'

export type TodoItem = {
    id: string;
    title: string;
    isCompleted: boolean;
};

export type TodoItemRec = {
    title?: string;
    isCompleted?: boolean;
}

export type SelectedGroup = 'all' | 'active' | 'completed';

export type TodoItemsFacet = {
    error: ?QueryError;
    items: Collection<TodoItem>;
    hasCompleted: boolean;
    itemsCount: number;
    selectedGroup: SelectedGroup;
}
