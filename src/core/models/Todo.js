// @flow

import shortId from 'shortid'
import {BaseModel} from 'reactive-di'
import {source} from 'reactive-di/annotations'

export interface TodoRec {
    id?: string;
    title?: string;
    isCompleted?: boolean;
}

@source({key: 'Todo'})
export default class Todo extends BaseModel<TodoRec> {
    id: string
    title: string
    isCompleted: boolean

    static defaults: TodoRec = {
        id: '',
        title: '',
        isCompleted: false
    }

    constructor(rec?: TodoRec = {}) {
        super(rec)
        this.id = rec.id || shortId.generate()
    }
}