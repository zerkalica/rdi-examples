/* @flow */

import type {ConfigItem} from 'reactive-di'

import TodoGroupState from 'reactive-di-todomvc/todo/models/TodoGroupState'
import TodoItemAdding from 'reactive-di-todomvc/todo/models/TodoItemAdding'
import TodoItemEditing from 'reactive-di-todomvc/todo/models/TodoItemEditing'
import TodoItemCollection, {
    TodoItemCollectionLoader
} from 'reactive-di-todomvc/todo/models/TodoItemCollection'

const deps: Array<ConfigItem> = [
    TodoGroupState,
    TodoItemAdding,
    TodoItemEditing,
    TodoItemCollection,
    TodoItemCollectionLoader
];

export default deps
