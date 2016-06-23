/* @flow */

import {value} from 'reactive-di/annotations'

@value()
export default class BaseEnv {
    referrer: string;
    userAgent: string;
    language: string;

    constructor(
        referrer: string,
        userAgent: string,
        language: string
    ) {
        this.referrer = referrer
        this.userAgent = userAgent
        this.language = language
    }
}
