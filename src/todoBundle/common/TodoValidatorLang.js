// @flow
import {source} from 'reactive-di/annotations'

@source({key: 'TodoValidatorLang'})
export default class TodoValidatorLang {
    requiredTitle = 'Title required'
}
