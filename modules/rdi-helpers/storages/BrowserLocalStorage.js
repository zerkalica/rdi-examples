/* @flow */

import AbstractStorage from 'rdi-helpers/AbstractStorage'
import type {SetStorageOpts} from 'rdi-helpers/AbstractStorage'

export default class BrowserLocalStorage extends AbstractStorage {
    _storage: Storage

    constructor(storage: Storage) {
        super()
        this._storage = storage
    }

    get<V>(key: string): ?V {
        const value: ?string = this._storage.getItem(key)
        return !value ? null : JSON.parse(value || '')
    }

    set<V>(key: string, value: V, _opts?: SetStorageOpts): void {
        this._storage.setItem(key, JSON.stringify(value))
    }

    clear(key: string): void {
        this._storage.removeItem(key)
    }

    clearAll(): void {
        this._storage.clear()
    }
}
