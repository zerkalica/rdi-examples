// @flow

import {mem} from 'lom_atom'

interface IParent<V: Object> {
    beginFetch(): void;
    endFetch(f: FetcherResponse<V>, e?: Error): void;
}

class FetcherResponse<V: Object> {
    _url: string
    _init: RequestOptions | void
    _state: V | void
    _ptr: IParent<V> | void

    constructor(url: string, init?: RequestOptions, state?: V, ptr?: IParent<V>) {
        this._url = url
        this._init = init
        this._state = state
        this._ptr = ptr
    }

    _fetch(): Promise<Response> {
        if (this._ptr) {
            this._ptr.beginFetch()
        }

        return fetch(this._url, this._init)
    }

    _end = (e?: any) => {
        if (this._ptr) {
            this._ptr.endFetch(this, e instanceof Error ? e : undefined)
        }
    }

    @mem response(next?: Response, force?: boolean): Response {
        this._fetch()
            .then((result: Response) => this.response(result))
            .catch((e: Error) => {
                this.response((e: any))
                return e
            })
            .then(this._end)

        throw new mem.Wait()
    }

    _getState(): V | void | string {
        const state = this._state
        this._state = undefined
        if (state !== undefined) {
            return state
        }
    }

    @mem text(next?: string): string {
        const state = this._getState()
        if (state !== undefined) {
            if (typeof state !== 'string') throw new Error(`${this._url} state need an string`)
            return state
        }

        this._fetch()
            .then((r: Response) => r.status === 204 ? '' : r.text())
            .then((data: string) => this.text(data))
            .catch((e: Error) => {
                this.text((e: any))
                return e
            })
            .then(this._end)

        throw new mem.Wait()
    }

    json(): V {
        const state = this._getState()
        if (state !== undefined) {
            if (typeof state !== 'object') throw new Error(`${this._url} state need an object`)
            return state
        }

        const text = this.text()

        return text ? JSON.parse(text) : ({}: any)
    }
}

type IState = Object
type ISuccessCb = (state: IState) => void
type IErrorCb = (e: Error) => void

export default class Fetcher {
    _state: IState
    _baseUrl: string
    _init: RequestOptions | void
    _renderer: IParent<*> | void

    static Response: Class<FetcherResponse<*>> = FetcherResponse

    constructor(
        baseUrl?: string,
        init?: RequestOptions,
        state?: IState,
        renderer?: IParent<*>
    ) {
        this._state = state || {}
        this._baseUrl = baseUrl || ''
        this._init = init
        this._renderer = renderer
    }

    mergeOptions(init?: RequestOptions): RequestOptions | void {
        return this._init === undefined && init === undefined ? undefined : {...(this._init || {}), ...(init || {})}
    }

    fetch<V: any>(url: string, init?: RequestOptions): FetcherResponse<V> {
        const method = (init ? init.method : null) || 'GET'
        let state: any = this._state[url]
        if (state) {
            state = state[method]
            if (state !== undefined) {
                state[method] = undefined
            } else {
                this._state[url] = undefined
            }
        }

        return new this.constructor.Response(this._baseUrl + url, this.mergeOptions(init), state, this._renderer)
    }
}

export class ServerRenderer implements IParent<*> {
    _size = 0
    _callbacks: ISuccessCb[] = []
    _errors: IErrorCb[] = []
    _error = false
    _state: IState = {}
    _render: () => void

    constructor(
        render: () => void
    ) {
        this._render = render
    }

    beginFetch() {
        this._size++
    }

    endFetch(v: FetcherResponse<*>, e?: Error) {
        this._size--

        let data: Error | Object
        if (e) {
            data = e
            this._error = true
        } else {
            data = v.json()
        }

        const method = (v._init ? v._init.method : null) || 'GET'
        const result = method !== 'GET'
            ? {[method]: data}
            : data
        this._state[v._url] = result

        if (this._size === 0) {
            if (!this._error) {
                this._render()
            }
            if (this._size === 0) {
                const state = this._state
                const cbs = this._error ? this._errors : this._callbacks
                for (let i = 0; i < cbs.length; i++) {
                    cbs[i](state)
                }
                this._callbacks = []
                this._errors = []
                this._error = false
            }
        }
    }

    then(cb: ISuccessCb) {
        this._callbacks.push(cb)
        return this
    }

    catch(cb: IErrorCb) {
        this._errors.push(cb)
        return this
    }

    render() {
        this._render()

        return this
    }
}
