/* @flow */

import type {Collection} from 'reactive-di-todomvc/common'
import type QueryError from 'reactive-di-todomvc/common/errors/QueryError'

declare module 'reactive-di-todomvc/todo' {
    declare type TodoItem = {
        id: string;
        title: string;
        isCompleted: boolean;
    };

    declare type TodoItemRec = {
        title?: string;
        isCompleted?: boolean;
    }

    declare type SelectedGroup = 'all' | 'active' | 'completed';

    declare type TodoItemsFacet = {
        error: ?QueryError;
        items: Collection<TodoItem>;
        hasCompleted: boolean;
        itemsCount: number;
        totalCount: number;
        selectedGroup: SelectedGroup;
    }

    declare type IsAllCompleted = boolean;

    declare type CancelAdding = () => void;
    declare type CommitAdding = (item: TodoItem) => void;
    declare type ChangeAdding = (rec: TodoItemRec) => void;

    declare type RemoveTodoItem = (id: string) => void;
    declare type ToggleTodoItem = (id: string) => void;

    declare type BeginEditing = (item: TodoItem) => void;
    declare type CommitEditing = (item: TodoItem) => void;
    declare type CancelEditing = () => void;
    declare type ChangeEditing = (rec: TodoItemRec) => void;

    declare type ToggleAll = () => void;
    declare type ClearCompleted = () =>  void;

    declare type ShowAll = () => void;
    declare type ShowCompleted = () => void;
    declare type ShowActive = () => void;
}
