// @flow
import {source} from 'reactive-di/annotations'

@source({key: 'TodoOptions'})
export default class TodoOptions {
    isEditing = false
}
