// @flow

import AbstractStorage from 'rdi-helpers/AbstractStorage'
import type {SetStorageOpts} from 'rdi-helpers/AbstractStorage'
import Cookies from 'cookies-js'

export default class CookieStorage extends AbstractStorage {
    _cookies: Object

    constructor() {
        super()
        this._cookies = Cookies
    }

    get<V: Object>(key: string): ?V {
        return JSON.parse(this._cookies.get(key) || 'null')
    }

    set<V: Object>(key: string, v: V, opts?: SetStorageOpts): void {
        this._cookies.set(key, JSON.stringify(v), opts)
    }

    clear(key: string): void {
        this._cookies.clear(key)
    }
}
