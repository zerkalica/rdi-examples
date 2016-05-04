/* @flow */

type TodoGroupStateRec = {
    isAllCompleted?: boolean;
}

export default class TodoGroupState {
    isAllCompleted: boolean;

    constructor(rec: TodoGroupStateRec = {}) {
        this.isAllCompleted = rec.isAllCompleted || false
    }
}
