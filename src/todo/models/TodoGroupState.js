/* @flow */

import type {
    SelectedGroup
} from 'reactive-di-todomvc/i/todoInterfaces'
import {assignString, assignBoolean} from 'reactive-di-todomvc/common/helpers'

type TodoGroupStateRec = {
    isAllCompleted?: boolean;
    selectedGroup?: SelectedGroup;
}

export default class TodoGroupState {
    isAllCompleted: boolean;
    selectedGroup: SelectedGroup;

    constructor(rec: TodoGroupStateRec = {}) {
        this.isAllCompleted = assignBoolean(rec.isAllCompleted)
        this.selectedGroup = assignString(rec.selectedGroup, 'all')
    }
}
