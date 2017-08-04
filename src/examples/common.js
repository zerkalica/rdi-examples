// @flow
import type {NamesOf} from 'lom_atom'
import {force, mem, memkey} from 'lom_atom'
import fetchMock from 'fetch-mock/es5/client'

export function uuid(): string {
    let uuid = ''

    for (let i = 0; i < 32; i++) {
        let random = Math.random() * 16 | 0
        if (i === 8 || i === 12 || i === 16 || i === 20) {
            uuid += '-'
        }
        uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random)).toString(16)
    }

    return uuid
}

export class AbstractLocationStore {
    location(key: string, value?: string, force?: boolean): string {
        throw new Error('implement')
    }
}

export class BrowserLocationStore extends AbstractLocationStore {
    _location: Location
    _history: History
    _ns: string = 'lom_app'

    constructor(location: Location, history: History) {
        super()
        this._location = location
        this._history = history
    }

    _params(): URLSearchParams {
        return new URLSearchParams(this._location.search)
    }

    @memkey
    location(key: string, value?: string, force?: boolean): string {
        const params = this._params()
        if (value === undefined) return params.get(key)

        params.set(key, value)
        this._history.pushState(null, this._ns, `?${params.toString()}`)

        return value
    }
}

function KeyValueTheme() {
    return {
        item: {
            display: 'flex'
        },
        key: {
            width: '20%'
        },
        value: {
            width: '80%'
        }
    }
}
KeyValueTheme.theme = true

function KeyView(
    {children}: {children?: mixed},
    {theme}: {theme: NamesOf<typeof KeyValueTheme>}
) {
    return <div className={theme.key}>{children}</div>
}
KeyView.deps = [{theme: KeyValueTheme}]

function ValueView(
    {children}: {children?: mixed},
    {theme}: {theme: NamesOf<typeof KeyValueTheme>}
) {
    return <div className={theme.value}>{children}</div>
}
ValueView.deps = [{theme: KeyValueTheme}]

export function ItemView(
    {children}: {children?: mixed},
    {theme}: {theme: NamesOf<typeof KeyValueTheme>}
) {
    return <div className={theme.item}>{children}</div>
}
ItemView.deps = [{theme: KeyValueTheme}]
ItemView.Key = KeyView
ItemView.Value = ValueView

export class Locale {
    _defaultLang: string
    @force $: Locale

    @mem get lang(): string {
        setTimeout(() => {
            this.$.lang = 'gb'
        }, 400)

        return this._defaultLang
    }

    @mem set lang(lang: string) {}

    constructor(lang: string) {
        this._defaultLang = lang
    }
}

export class BrowserLocalStorage {
    _storage: Storage
    _key: string

    constructor(storage: Storage, key: string) {
        this._storage = storage
        this._key = key
    }

    get<V>(): ?V {
        const value: ?string = this._storage.getItem(this._key)
        return !value ? null : JSON.parse(value || '')
    }

    set<V>(value: V): void {
        this._storage.setItem(this._key, JSON.stringify(value))
    }

    clear(): void {
        this._storage.removeItem(this._key)
    }

    clearAll(): void {
        this._storage.clear()
    }
}

function delayed<V>(v: V, delay: number): (url: string, params: RequestOptions) => Promise<V> {
    return function resp(url: string, params: RequestOptions) {
        return new Promise((resolve: Function) => {
            setTimeout(() => { resolve(v) }, delay)
        })
    }
}

export function mockFetch(storage: Storage, delay?: number = 500, mocks: Function[]) {
    mocks.forEach((createMock) => {
        createMock(storage).forEach((data) => {
            fetchMock.mock({...data, response: delayed(data.response, delay)})
        })
    })
}
