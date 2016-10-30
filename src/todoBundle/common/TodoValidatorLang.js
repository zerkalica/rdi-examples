// @flow
import {BaseModel} from 'reactive-di'
import {source} from 'reactive-di/annotations'

export interface TodoValidatorLangRec {
}

@source({key: 'TodoValidatorLang'})
export default class TodoValidatorLang extends BaseModel<TodoValidatorLangRec> {
    requiredTitle: string

    static defaults: TodoValidatorLangRec = {
        requiredTitle: 'Title required'
    }
}
