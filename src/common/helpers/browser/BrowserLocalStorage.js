/* @flow */

import AbstractStorage from 'reactive-di-todomvc/common/services/AbstractStorage'

export default class BrowserLocalStorage extends AbstractStorage {
    _storage: Storage;

    constructor(storage: Storage) {
        super()
        this._storage = storage
    }

    getItem<V>(key: string): ?V {
        const value: ?string = this._storage.getItem(key);
        return !value ? null : JSON.parse(value || '')
    }

    setItem<V>(key: string, value: V): void {
        this._storage.setItem(key, JSON.stringify(value))
    }

    removeItem(key: string): void {
        this._storage.removeItem(key)
    }

    clear(): void {
        this._storage.clear()
    }
}
