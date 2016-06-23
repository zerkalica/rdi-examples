/* @flow */
import {observable} from 'reactive-di-observable/annotations'

@observable({key: 'DebugConfig'})
export default class DebugConfig {
    isEnabled: boolean;
    constructor(rec?: {
        isEnabled?: boolean
    } = {}) {
        this.isEnabled = rec.isEnabled || false
    }
}
