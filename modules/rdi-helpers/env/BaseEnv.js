/* @flow */

import {source} from 'reactive-di/annotations'

@source({key: 'BaseEnv'})
export default class BaseEnv {
    referrer: string
    userAgent: string
    language: string
    userIp: ?string

    constructor(
        referrer: string,
        userAgent: string,
        language: string,
        userIp?: ?string
    ) {
        this.referrer = referrer
        this.userAgent = userAgent
        this.language = language
        this.userIp = userIp || null
    }
}
