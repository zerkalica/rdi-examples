// @flow
import {BaseModel} from 'reactive-di'
import {source} from 'reactive-di/annotations'

@source({key: 'EmulatedApiParams'})
export default class EmulatedApiParams extends BaseModel<*> {
    delay: number
    errorRate: number

    static defaults = {
        delay: 500,
        errorRate: 0
    }
}
