// @flow
import {BaseModel} from 'reactive-di'
import {source} from 'reactive-di/annotations'

@source({key: 'EmulatedApiParams'})
export default class EmulatedApiParams extends BaseModel {
    delay = 700
    errorRate = 0
}
