// @flow
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

    static HttpError: Class<HttpError> = HttpError

    constructor(opts?: {
        timeout?: ?number;
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

    normalizeResponse(response: Response, opts: IRequestOptions): Promise<string | HttpError> {
        if (response.status >= 400) {
            const HttpError: any = this.constructor.HttpError
            return response.text()
                .then((data: string) => new HttpError({opts, parent: null, response, data}))
        }

        return response.status === 204
            ? Promise.resolve('')
            : response.text()
    }

    fetch(url: string, opts: RequestOptions): Promise<Response> {
        return fetch(url, opts)
    }

    request(opts: IRequestOptions): Promise<*> {
        const collector = this._collector
        if (collector) collector.beginFetch(opts)
        const {HttpError} = this.constructor
        return timeoutPromise(this.fetch(opts.fullUrl, opts), this._timeout)
            .then((response: Response) => this.normalizeResponse(response, opts)
                .catch((err: Error) => new HttpError({opts, parent: err, response}))
            )
            .catch((err: Error) => new HttpError({opts, parent: err}))
            .then((result) => {
                if (collector) collector.endFetch(result, opts)
                return result
            })
    }

    getFullUrl(url: string): string {
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

    _request([method, url]: [string, string]): FetcherApi {
        throw new Error('implement')
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
