// @flow

import {source} from 'reactive-di/annotations'

@source({key: 'TodoGroupState'})
export default class TodoGroupState {
    isAllCompleted = false
}
