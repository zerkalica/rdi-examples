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


class SpinnerTheme {
    @theme get css() {
        return {
            '@keyframes rdi_spinner_wait_move': {
                from: {
                    backgroundPosition: '0 0'
                },
                to: {
                    backgroundPosition: '-28px 0'
                }
            },
            spinner: {
                '& *': {
                    opacity: '0.8',
                    background: 'none'
                },
                position: 'relative',
                zIndex: '1000',
                left: 0,
                top: 0,
                pointerEvents: 'none',
                backgroundSize: '28px 28px',
                backgroundImage: `repeating-linear-gradient(45deg, rgba(0,0,0, 0.05), rgba(0,0,0,0.05) 9px, rgba(255,255,255,.015) 10px, rgba(255,255,255,.015) 20px)`,
                animation: 'rdi_spinner_wait_move .25s steps(6) infinite',
                minWidth: '28px',
                minHeight: '28px'
            }
        }
    }
}

export function SpinnerView(
    {children}: {children: any},
    {theme: {css}}: {theme: SpinnerTheme}
) {
    return <div class={css.spinner}>{children}</div>
}

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
