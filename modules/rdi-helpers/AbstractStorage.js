// @flow

import {source} from 'reactive-di/annotations'

export interface SetStorageOpts {
    expires?: number;
}

@source({key: 'AbstractStorage'})
export default class AbstractStorage {
    /* eslint-disable */
    get<V>(key: string): ?V {
        throw new Error('Not implemented')
    }
    set<V>(key: string, v: V, opts?: SetStorageOpts): void {}
    clear(key: string): void {}
    clearAll(): void {
        throw new Error('Not implemented')
    }
}
