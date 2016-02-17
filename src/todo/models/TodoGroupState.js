/* @flow */

import rdi from 'reactive-di-todomvc/common/annotations'

import type {
    SelectedGroup
} from 'reactive-di-todomvc/i/todoInterfaces'

type TodoGroupStateRec = {
    isAllCompleted?: boolean;
    selectedGroup?: SelectedGroup;
}

class TodoGroupState {
    isAllCompleted: boolean;
    selectedGroup: SelectedGroup;

    constructor(rec: TodoGroupStateRec = {}) {
        this.isAllCompleted = rec.isAllCompleted || false
        this.selectedGroup = rec.selectedGroup || 'all'
    }
}

export default rdi.model(TodoGroupState)
