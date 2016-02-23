/* @flow */

import rdi from 'reactive-di-todomvc/common/annotations'
import {merge} from 'reactive-di'
import TodoGroupState from 'reactive-di-todomvc/todo/models/TodoGroupState'

function showAll(groupState: TodoGroupState): TodoGroupState {
    return merge(groupState, {
        selectedGroup: 'all'
    })
}

function showActive(groupState: TodoGroupState): TodoGroupState {
    return merge(groupState, {
        selectedGroup: 'active'
    })
}

function showCompleted(groupState: TodoGroupState): TodoGroupState {
    return merge(groupState, {
        selectedGroup: 'completed'
    })
}

export default {
    showAll: rdi.syncsetter(TodoGroupState)(showAll),
    showCompleted: rdi.syncsetter(TodoGroupState)(showCompleted),
    showActive: rdi.syncsetter(TodoGroupState)(showActive)
}
