/* @flow */
import {observable} from 'reactive-di-observable/annotations'

type TodoGroupStateRec = {
    isAllCompleted?: boolean;
}

@observable({key: 'TodoGroupState'})
export default class TodoGroupState {
    isAllCompleted: boolean;

    constructor(rec: TodoGroupStateRec = {}) {
        this.isAllCompleted = rec.isAllCompleted || false
    }
}
