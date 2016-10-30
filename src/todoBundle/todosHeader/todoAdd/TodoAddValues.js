// @flow

import {BaseModel} from 'reactive-di'
import {source} from 'reactive-di/annotations'

export interface TodoAddValuesRec {
}

@source({key: 'TodoAddValues'})
export default class TodoAddValues extends BaseModel<TodoAddValuesRec> {
    title: string
    static defaults: TodoAddValuesRec = {
        title: ''
    }
}
