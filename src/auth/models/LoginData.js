/* @flow */

import {observable} from 'reactive-di-observable/annotations'

@observable()
export default class LoginData {
    name: string;
    password: string;

    constructor(rec?: {
        name?: string;
        password?: string;
    } = {}) {
        this.name = rec.name || ''
        this.password = rec.password || ''
    }
}
