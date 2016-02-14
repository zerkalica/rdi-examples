/* @flow */

import rdi from '../../common/annotations'

import type {
    SelectedGroup
} from '../interfaces'

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
