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
    showAll: rdi.setter(TodoGroupState)(showAll),
    showCompleted: rdi.setter(TodoGroupState)(showCompleted),
    showActive: rdi.setter(TodoGroupState)(showActive)
}
