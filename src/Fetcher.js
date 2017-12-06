// @flow

import {mem, AtomWait} from 'lom_atom'

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

interface IRenderer {
    beginFetch(): void;
    endFetch(data: string | Error, url: string): void;
}

interface IFetcher {
    baseUrl: string;
    +state: IState | void;
    +renderer: IRenderer | void;
    mergeOptions(init: IRequestOptions): IRequestOptions;
}

export interface FetcherApi<V> {
    url: string;
    options(opts: $Shape<IRequestOptions>): FetcherApi<V>;
    text(next?: string): string;
    json(data?: V): V;
}

class FetcherResponse<V> implements FetcherApi<V> {
    _fetcher: IFetcher
    url: string
    _options: IRequestOptions

    constructor(method: string, url: string, fetcher: IFetcher) {
        this.url = url
        this._options = {method}
        this._fetcher = fetcher
    }

    _getState<V>(): V | void {
        const {_fetcher: {state}, url: url} = this
        if (state !== undefined) {
            const apiData: V | void = (state[url]: any)
            state[url] = undefined
            return apiData
        }
    }

    options(opts: $Shape<IRequestOptions>): this {
        Object.assign((this._options: Object), opts)
        return this
    }

    _request(url: string, init?: IRequestOptions): Promise<Response> {
        return fetch(url, init)
    }

    _disposed = false

    @mem text(next?: string | Error): string {
        const state = this._getState()
        if (state !== undefined) {
            if (typeof state !== 'string') throw new Error(`fetch.text ${this.url}, string expected`)
            return state
        }
        if (next instanceof Error) throw new Error('Need a string')

        const {_fetcher: fetcher} = this
        const {renderer} = fetcher
        const url = fetcher.baseUrl + this.url
        const opts: IRequestOptions = fetcher.mergeOptions(
            ({
                ...this._options,
                body: next === undefined ? undefined : next
            }: IRequestOptions)
        )
        const params: IErrorParams = {
            url,
            method: opts.method || 'GET',
            body: opts.body || ''
        }

        if (renderer) renderer.beginFetch()
        this._disposed = false
        timeoutPromise(this._request(url, opts), opts ? opts.timeout : null, params)
            .then((r: Response) => r.status === 204 ? '' : r.text())
            .then((data: string) => {
                if (renderer) renderer.endFetch(data, url)
                if (this._disposed) return
                mem.cache(this.text(data))
            })
            .catch((e: Error) => {
                const err = e instanceof HttpError
                    ? e
                    : new HttpError((e: Object).statusCode || 500, e.message, null, null, params)
                err.stack = e.stack

                if (renderer) renderer.endFetch(e, url)
                if (this._disposed) return
                mem.cache(this.text(err))
            })

        throw new AtomWait(`${params.method} ${params.url}`)
    }

    destructor() {
        this._disposed = true
    }

    json(next?: V): V {
        const state: V | void = this._getState()
        if (state !== undefined) {
            if (typeof state !== 'object') throw new Error(`${this.url} state need an object`)
            return state
        }

        const text = this.text(next === undefined ? undefined : JSON.stringify(next, null, '\t'))

        return JSON.parse(text)
    }
}

type IState = {[id: string]: Object | void}
type ISuccessCb = (state: IState) => void
type IErrorCb = (e: Error) => void

export default class Fetcher implements IFetcher {
    state: IState | void
    renderer: IRenderer | void

    _init: IRequestOptions | void
    baseUrl: string

    constructor(opts?: {
        baseUrl?: string;
        state?: IState;
        init?: IRequestOptions;
        renderer?: IRenderer;
    } = {}) {
        this.baseUrl = opts.baseUrl || ''
        this.state = opts.state
        this._init = opts.init
        this.renderer = opts.renderer
    }

    mergeOptions(init: IRequestOptions): IRequestOptions {
        return {
            ...(this._init || {}),
            ...(init || {})
        }
    }

    @mem.key _request<V>([method, url]: [string, string]): FetcherApi<V> {
        return new FetcherResponse(method, url, this)
    }

    post<V>(url: string): FetcherApi<V> {
        return this._request(['POST', url])
    }

    get<V>(url: string): FetcherApi<V> {
        return this._request(['GET', url])
    }

    put<V>(url: string): FetcherApi<V> {
        return this._request(['PUT', url])
    }

    delete<V>(url: string): FetcherApi<V> {
        return this._request(['DELETE', url])
    }

    patch<V>(url: string): FetcherApi<V> {
        return this._request(['PATCH', url])
    }
}

export class ServerRenderer implements IRenderer {
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

    endFetch(data: string | Error, url: string) {
        this._size--

        if (data instanceof Error) {
            this._error = true
        } else {
            try {
                this._state[url] = JSON.parse(data)
            } catch (e) {
                console.warn(e)
            }
        }

        if (this._size === 0) {
            if (!this._error) {
                this._render()
            }
            if (this._size === 0) {
                const state = this._state
                const cbs = this._error ? this._errors : this._callbacks
                for (let i = 0; i < cbs.length; i++) {
                    cbs[i]((state: any))
                }
                this._callbacks = []
                this._errors = []
                this._error = false
            }
        }
    }

    then(cb: ISuccessCb): this {
        this._callbacks.push(cb)
        return this
    }

    catch(cb: IErrorCb): this {
        this._errors.push(cb)
        return this
    }

    render(): this {
        this._render()

        return this
    }
}
