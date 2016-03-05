/* @flow */

import {assignBoolean} from 'reactive-di-todomvc/common/helpers'

type TodoGroupStateRec = {
    isAllCompleted?: boolean;
}

export default class TodoGroupState {
    isAllCompleted: boolean;

    constructor(rec: TodoGroupStateRec = {}) {
        this.isAllCompleted = assignBoolean(rec.isAllCompleted)
    }
}
