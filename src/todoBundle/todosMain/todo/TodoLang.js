// @flow
import {source} from 'reactive-di/annotations'

@source({key: 'TodoLang'})
export default class TodoLang {
    requiredTitle = 'Title required'
}
