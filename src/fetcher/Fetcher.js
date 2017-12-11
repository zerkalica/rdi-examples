// @flow

import {mem} from 'lom_atom'
import type {IState, IFetcher, IStateCollector, FetcherApi, IRequestOptions} from './interfaces'
import timeoutPromise from './timeoutPromise'
import HttpError from './HttpError'
import FetcherResponse from './FetcherResponse'

export default class Fetcher implements IFetcher {
    state: IState | void
    _collector: IStateCollector | void

    _init: $Shape<IRequestOptions> | void
    _baseUrl: [RegExp, string][]
    _timeout: number

    constructor(opts?: {
        timeout?: ?number,
        baseUrl?: string | [string, string][];
        state?: IState;
        init?: $Shape<IRequestOptions>;
        collector?: IStateCollector;
    } = {}) {
        const baseUrl = opts.baseUrl
        this._baseUrl = baseUrl instanceof Array
            ? baseUrl.map((rec) => ([new RegExp(rec[0]), rec[1]]))
            : [[new RegExp('.*'), baseUrl || '']]

        this.state = opts.state
        this._init = opts.init
        this._timeout = opts.timeout || 120000
        this._collector = opts.collector
    }

    _normalizeResponse(r: Response, opts: IRequestOptions): Promise<string> {
        return r.status === 204 ? Promise.resolve('') : r.text()
    }

    _normalizeError(err: Error, opts: IRequestOptions): Promise<Error> {
        return Promise.resolve(new HttpError(err, opts))
    }

    _fetch(url: string, opts: RequestOptions): Promise<Response> {
        return timeoutPromise(fetch(url, opts), this._timeout)
    }

    request(opts: IRequestOptions): Promise<*> {
        const collector = this._collector
        if (collector) collector.beginFetch(opts)
        return this._fetch(opts.fullUrl, opts)
            .then((r: Response) => this._normalizeResponse(r, opts))
            .catch((err: Error) => this._normalizeError(err, opts))
            .catch((err: Error) => new HttpError(err, opts))
            .then((result) => {
                if (collector) collector.endFetch(result, opts)
                return result
            })
    }

    _getFullUrl(url: string): string {
        const bu = this._baseUrl
        let baseUrl = ''
        for (let i = 0; i < bu.length; i++) {
            const [mask, base] = bu[i]
            if (mask.test(url)) {
                baseUrl = base
                break
            }
        }

        return baseUrl + url
    }

    mergeOptions(init: IRequestOptions): IRequestOptions {
        return {...this._init, ...(init: Object)}
    }

    @mem.key _request([method, url]: [string, string]): FetcherApi {
        return new FetcherResponse(method, url, this._getFullUrl(url), this)
    }

    post<V>(url: string): FetcherApi {
        return this._request(['POST', url])
    }

    get(url: string): FetcherApi {
        return this._request(['GET', url])
    }

    put(url: string): FetcherApi {
        return this._request(['PUT', url])
    }

    delete(url: string): FetcherApi {
        return this._request(['DELETE', url])
    }

    patch(url: string): FetcherApi {
        return this._request(['PATCH', url])
    }
}
