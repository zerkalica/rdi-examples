// @flow
import {source} from 'reactive-di/annotations'

@source({key: 'EmulatedApiParams'})
export default class EmulatedApiParams {
    delay = 700
    errorRate = 0
}
