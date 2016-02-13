/* @flow */

import rdi from '../../common/annotations'
import {merge} from 'reactive-di'
import TodoGroupState from '../models/TodoGroupState'

export function showAll(groupState: TodoGroupState): TodoGroupState {
    return merge(groupState, {
        selectedGroup: 'all'
    })
}
rdi.setter(TodoGroupState)(showAll)

export function showActive(groupState: TodoGroupState): TodoGroupState {
    return merge(groupState, {
        selectedGroup: 'active'
    })
}
rdi.setter(TodoGroupState)(showActive)

export function showCompleted(groupState: TodoGroupState): TodoGroupState {
    return merge(groupState, {
        selectedGroup: 'completed'
    })
}
rdi.setter(TodoGroupState)(showCompleted)
