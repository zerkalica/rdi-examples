/* @flow */
import {source} from 'reactive-di/annotations'

@source({key: 'DebugConfig', construct: true})
export default class DebugConfig {
    isEnabled: boolean

    constructor(rec?: {
        isEnabled?: boolean
    } = {}) {
        this.isEnabled = rec.isEnabled === undefined ? true : rec.isEnabled
    }
}
