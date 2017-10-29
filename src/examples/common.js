// @flow
import {mem} from 'lom_atom'
import {theme} from 'reactive-di'
import fetchMock from 'fetch-mock/es5/client'

class KeyValueTheme {
    @theme get css() {
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
}

function KeyView(
    {children}: {children?: any},
    {theme: {css}}: {theme: KeyValueTheme}
) {
    return <div class={css.key}>{children}</div>
}

function ValueView(
    {children}: {children?: any},
    {theme: {css}}: {theme: KeyValueTheme}
) {
    return <div class={css.value}>{children}</div>
}

export function ItemView(
    {children}: {children?: any},
    {theme: {css}}: {theme: KeyValueTheme}
) {
    return <div class={css.item}>{children}</div>
}
ItemView.Key = KeyView
ItemView.Value = ValueView

export class Locale {
    _defaultLang: string

    @mem get lang(): string {
        setTimeout(() => {
            this.lang = 'gb'
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
