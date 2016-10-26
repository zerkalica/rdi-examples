// @flow
import {BaseModel} from 'reactive-di'
import {source} from 'reactive-di/annotations'

export interface TodoLangRec {
}

@source({key: 'TodoLang'})
export default class TodoLang extends BaseModel<TodoLangRec> {
    requiredTitle: string

    static defaults: TodoLangRec = {
        requiredTitle: 'Title required'
    }
}
