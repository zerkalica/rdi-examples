// @flow

import {BaseModel} from 'reactive-di'
import {source} from 'reactive-di/annotations'

export interface TodoAddLangRec {
    todoPlaceholder?: string
}

@source({key: 'TodoAddLang'})
export default class TodoAddLang extends BaseModel {
    todoPlaceholder = 'What need to add?'
}
