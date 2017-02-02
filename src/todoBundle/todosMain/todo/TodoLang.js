// @flow
import {BaseModel} from 'reactive-di'
import {source} from 'reactive-di/annotations'

export interface TodoLangRec {
}

@source({key: 'TodoLang'})
export default class TodoLang extends BaseModel {
    requiredTitle = 'Title required'
}
