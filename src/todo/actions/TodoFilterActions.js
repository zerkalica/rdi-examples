/* @flow */

import {merge} from 'reactive-di'
import TodoGroupState from 'reactive-di-todomvc/todo/models/TodoGroupState'

export function showAll(groupState: TodoGroupState): TodoGroupState {
    return merge(groupState, {
        selectedGroup: 'all'
    })
}

export function showActive(groupState: TodoGroupState): TodoGroupState {
    return merge(groupState, {
        selectedGroup: 'active'
    })
}

export function showCompleted(groupState: TodoGroupState): TodoGroupState {
    return merge(groupState, {
        selectedGroup: 'completed'
    })
}
