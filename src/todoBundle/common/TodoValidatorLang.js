// @flow
import {BaseModel} from 'reactive-di'
import {source} from 'reactive-di/annotations'

@source({key: 'TodoValidatorLang'})
export default class TodoValidatorLang extends BaseModel {
    requiredTitle = 'Title required'
}
