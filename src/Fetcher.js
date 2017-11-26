// @flow

import {mem} from 'lom_atom'

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
    endFetch(f: FetcherResponse, e?: Error): void;
}

interface IFetcher {
    +state: IState | void;
    +renderer: IRenderer | void;
    mergeOptions(init?: IRequestOptions, isSaving?: boolean): IRequestOptions | void;
    request(url: string, init?: IRequestOptions): Promise<Response>;
}

class FetcherResponse {
    _fetcher: IFetcher
    _url: string
    _opts: IRequestOptions | void

    constructor(url: string, fetcher: IFetcher) {
        this._url = url
        this._fetcher = fetcher
        this._opts = undefined
    }

    _getState<V>(): V | void {
        const {_fetcher: {state}, _url: url} = this
        if (state !== undefined) {
            const apiData: V | void = (state[url]: any)
            state[url] = undefined
            return apiData
        }
    }

    options(opts: IRequestOptions): this {
        this._opts = opts
        return this
    }

    methodGet(): string {
        return 'GET'
    }

    methodPost(): string {
        return 'POST'
    }

    _addMethod(opts?: IRequestOptions, isSave: boolean): IRequestOptions {
        return {
            ...opts,
            method: isSave ? this.methodPost() : this.methodGet()
        }
    }

    @mem text(next?: string | Error): string {
        const state = this._getState()
        if (state !== undefined) {
            if (typeof state !== 'string') throw new Error(`fetch.text ${this._url}, string expected`)
            return state
        }

        const {_url: url, _fetcher: fetcher} = this
        const {renderer} = fetcher
        const opts = fetcher.mergeOptions(this._addMethod(this._opts, next !== undefined))
        const params: IErrorParams = {
            url: url,
            method: opts ? opts.method : 'GET',
            body: opts ? opts.body : ''
        }

        if (renderer) renderer.beginFetch()

        timeoutPromise(fetcher.request(url, opts), opts ? opts.timeout : null, params)
            .then((r: Response) => r.status === 204 ? '' : r.text())
            .then((data: string) => {
                this.text(mem.cache(data))
                if (renderer) renderer.endFetch(this)
            })
            .catch((e: Error) => {
                const err = e instanceof HttpError
                    ? e
                    : new HttpError((e: Object).statusCode || 500, e.message, null, null, params)
                err.stack = e.stack
                this.text(mem.cache(err))
                if (renderer) renderer.endFetch(this, e)
            })

        throw new mem.Wait(`${params.method} ${params.url}`)
    }

    json<V: Object>(next?: V): V {
        const state: V | void = this._getState()
        if (state !== undefined) {
            if (typeof state !== 'object') throw new Error(`${this._url} state need an object`)
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
    _baseUrl: string
    _Response: Class<FetcherResponse>

    constructor(opts?: {
        baseUrl?: string;
        state?: IState;
        init?: IRequestOptions;
        renderer?: IRenderer;
        Response?: Class<FetcherResponse>;
    } = {}) {
        this._Response = opts.Response || FetcherResponse
        this._baseUrl = opts.baseUrl || ''
        this.state = opts.state
        this._init = opts.init
        this.renderer = opts.renderer
    }

    request(url: string, init?: IRequestOptions): Promise<Response> {
        return fetch(url, init)
    }

    mergeOptions(init?: IRequestOptions): IRequestOptions | void {
        if (this._init === undefined && init === undefined) return

        return {
            ...(this._init || {}),
            ...(init || {})
        }
    }

    @mem.key fetch(url: string): FetcherResponse {
        return new this._Response(this._baseUrl + url, this)
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

    endFetch(v: FetcherResponse, e?: Error) {
        this._size--

        let data: Error | Object
        if (e) {
            data = e
            this._error = true
        } else {
            data = v.json()
        }

        this._state[v._url] = data

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
