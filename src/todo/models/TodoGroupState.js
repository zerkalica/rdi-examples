/* @flow */

import rdi from 'reactive-di-todomvc/common/annotations'

import type {
    SelectedGroup
} from 'reactive-di-todomvc/i/todoInterfaces'
import {assignString, assignBoolean} from 'reactive-di-todomvc/common/helpers'

type TodoGroupStateRec = {
    isAllCompleted?: boolean;
    selectedGroup?: SelectedGroup;
}

class TodoGroupState {
    isAllCompleted: boolean;
    selectedGroup: SelectedGroup;

    constructor(rec: TodoGroupStateRec = {}) {
        this.isAllCompleted = assignBoolean(rec.isAllCompleted)
        this.selectedGroup = assignString(rec.selectedGroup, 'all')
    }
}

export default rdi.model(TodoGroupState)
