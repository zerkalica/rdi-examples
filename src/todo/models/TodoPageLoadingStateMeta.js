// @flow
import {meta} from 'reactive-di-observable/annotations'
import TodoItemCollection from 'reactive-di-todomvc/todo/models/TodoItemCollection'
import _ from 'babel-plugin-transform-metadata/_'

import type {
    CommitAdding,
    RemoveTodoItem,
    ToggleTodoItem,

    CommitEditing,
    ToggleAll,
    ClearCompleted
} from 'reactive-di-todomvc/todo/i'

@meta(
    TodoItemCollection,
    (_: ToggleAll),
    (_: ClearCompleted),
    (_: RemoveTodoItem),
    (_: ToggleTodoItem),
    (_: CommitEditing),
    (_: CommitAdding)
)
export default class TodoPageLoadingStateMeta {
    pending: boolean;
    success: boolean;
    error: ?Error;
}
