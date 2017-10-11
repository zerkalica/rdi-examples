// @flow

import {mem} from 'lom_atom'

interface IParent<V: Object> {
    beginFetch(): void;
    endFetch(f: FetcherResponse<V>, e?: Error): void;
}

type IRequestOptions = RequestOptions & {timeout?: number}

export interface IErrorParams {
    url: string;
    method: string;
    body: string | Object;
}

export class HttpError extends Error {
    statusCode: number
    message: string
    stack: string

    localizedMessage: ?string
    errorCode: ?string
    params: ?IErrorParams

    constructor(
        statusCode: number,
        message: string,
        errorCode?: ?string,
        localizedMessage?: ?string,
        params?: IErrorParams
    ) {
        super(message)
        // $FlowFixMe new.target
        ;(this: Object)['__proto__'] = new.target.prototype
        this.params = params || null
        this.statusCode = statusCode
        this.errorCode = errorCode || null
        this.localizedMessage = localizedMessage || null
    }
}

function timeoutPromise<D>(promise: Promise<D>, timeout?: ?number, params: IErrorParams): Promise<D> {
    if (!timeout) return promise
    const tm = timeout

    return Promise.race([
        promise,
        new Promise((resolve: (data: D) => void, reject: (err: any) => void) => {
            setTimeout(() => reject(new HttpError(
                408,
                'Request timeout client emulation: ' + (tm / 1000) + 's',
                null,
                null,
                params
            )), tm)
        })
    ])
}

interface IFetcher {
    request(url: string, init?: IRequestOptions): Promise<Response>;
}

class FetcherResponse<V: Object> {
    _url: string
    _init: IRequestOptions | void
    _state: V | void
    _ptr: IParent<V> | void
    _fetcher: IFetcher

    constructor(url: string, init?: IRequestOptions, state?: V, ptr?: IParent<V>, fetcher: IFetcher) {
        this._url = url
        this._init = init
        this._state = state
        this._ptr = ptr
        this._fetcher = fetcher
    }

    _end = (e?: any) => {
        if (this._ptr) {
            this._ptr.endFetch(this, e instanceof Error ? e : undefined)
        }
    }

    _getState(): V | void | string {
        const state = this._state
        this._state = undefined
        if (state !== undefined) {
            return state
        }
    }

    @mem text(next?: string | Error, force?: boolean): string {
        const state = this._getState()
        if (state !== undefined) {
            if (typeof state !== 'string') throw new Error(`${this._url} state need an string`)
            return state
        }

        if (this._ptr) {
            this._ptr.beginFetch()
        }
        const init = this._init
        const params: IErrorParams = {
            url: this._url,
            method: init ? init.method : 'GET',
            body: init ? init.body : ''
        }
        timeoutPromise(this._fetcher.request(this._url, init), init ? init.timeout : null, params)
            .then((r: Response) => r.status === 204 ? '' : r.text())
            .then((data: string) => this.text(data, true))
            .catch((e: Error) => {
                if (!(e instanceof HttpError)) {
                    const err = new HttpError((e: Object).statusCode || 500, e.message, null, null, params)
                    err.stack = e.stack
                    this.text(err, true)
                }
                this.text((e: any), true)
                return e
            })
            .then(this._end)

        throw new mem.Wait(`${params.method} ${params.url}`)
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
    _init: IRequestOptions | void
    _renderer: IParent<*> | void

    static Response: Class<FetcherResponse<*>> = FetcherResponse

    constructor(
        baseUrl?: string,
        init?: IRequestOptions,
        state?: IState,
        renderer?: IParent<*>
    ) {
        this._state = state || {}
        this._baseUrl = baseUrl || ''
        this._init = init
        this._renderer = renderer
    }

    request(url: string, init?: IRequestOptions): Promise<Response> {
        return fetch(url, init)
    }

    mergeOptions(init?: IRequestOptions): IRequestOptions | void {
        return this._init === undefined && init === undefined
            ? undefined
            : {...(this._init || {}), ...(init || {})}
    }

    fetch<V: any>(url: string, init?: IRequestOptions): FetcherResponse<V> {
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

        return new this.constructor.Response(
            this._baseUrl + url,
            this.mergeOptions(init),
            state,
            this._renderer,
            (this: IFetcher)
        )
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
