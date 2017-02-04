// @flow

import {BaseModel} from 'reactive-di'
import {source} from 'reactive-di/annotations'

@source({key: 'TodoGroupState'})
export default class TodoGroupState extends BaseModel {
    isAllCompleted = false
}
