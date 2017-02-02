// @flow

import shortId from 'shortid'
import {BaseModel} from 'reactive-di'
import {source} from 'reactive-di/annotations'

export interface TodoRec {
    id?: string;
    title?: string;
    isCompleted?: boolean;
    created?: string;
}

@source({key: 'Todo'})
export default class Todo extends BaseModel {
    id = shortId.generate()
    title = ''
    isCompleted = false
    created = (new Date()).toISOString()
}
