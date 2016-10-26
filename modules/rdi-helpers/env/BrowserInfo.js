// @flow

import {source} from 'reactive-di/annotations'

@source({key: 'BrowserInfo'})
export default class BrowserInfo {
    webkit: boolean
    blink: boolean
    chrome: boolean
    firefox: boolean
    msie: boolean
    msedge: boolean
    safari: boolean
    android: boolean
    ios: boolean
    opera: boolean
    phantom: boolean
    sailfish: boolean
    ucbrowser: boolean
    vivaldi: boolean

    mobile: boolean
    tablet: boolean

    mac: boolean
    windows: boolean
    windowsphone: boolean
    linux: boolean
    chromeos: boolean
    android: boolean
    ios: boolean

    osversion: ?string

    version: string

    constructor(rec?: $Shape<BrowserInfo> = {}) {
        Object.assign((this: Object), rec)
    }
}
