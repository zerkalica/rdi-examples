/* @flow */

import type QueryError from 'reactive-di-todomvc/common/errors/QueryError'
import type {FlowFix} from 'reactive-di-todomvc/common/i'

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
    items: TodoItem[];
    hasCompleted: boolean;
    itemsCount: number;
    totalCount: number;
    selectedGroup: SelectedGroup;
}

export type IsAllCompleted = boolean;

export type CancelAdding = () => void;
export type CommitAdding = (item: TodoItem) => void;
export type ChangeAdding = (rec: TodoItemRec) => void;

export type RemoveTodoItem = (id: string) => void;
export type ToggleTodoItem = (id: string) => void;

export type BeginEditing = (item: TodoItem) => void;
export type CommitEditing = (item: TodoItem) => void;
export type CancelEditing = () => void;
export type ChangeEditing = (rec: TodoItemRec) => void;

export type ToggleAll = () => void;
export type ClearCompleted = () => void;

export type ShowAll = () => void;
export type ShowCompleted = () => void;
export type ShowActive = () => void;

export type TodoElementProps = {
    item: TodoItem;
}
export type ITodoElement = FlowFix<TodoElementProps>;
export type ITodoElementList = FlowFix;

export type ITodoPage = FlowFix;
export type ITodoHeader = FlowFix;
export type ITodoMain = FlowFix;
export type ITodoFooter = FlowFix;
export type ITodoPageLoadingState = FlowFix;
