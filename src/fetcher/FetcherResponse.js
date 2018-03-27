// @flow
import type {IRequestOptions, IFetcher, FetcherApi} from './interfaces'

export default class FetcherResponse implements FetcherApi {
    _fetcher: IFetcher
    _options: IRequestOptions
    constructor(method: string, url: string, fullUrl: string, fetcher: IFetcher) {
        this._options = {
            method,
            url,
            fullUrl,
            requestId: '' + Date.now()
        }
        this._fetcher = fetcher
    }

    _getState<V>(): V | void {
        const {_fetcher: {state}, _options: {url}} = this
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

    text<V: string | Error | FormData>(next?: V): V {
        if (next instanceof Error) throw new Error('Need a string')
        const {_fetcher: fetcher} = this
        const opts: IRequestOptions = fetcher.mergeOptions(
            ({
                ...this._options,
                body: next === undefined ? undefined : next
            }: $Shape<IRequestOptions>)
        )

        const state = this._getState()
        if (state !== undefined) {
            if (typeof state !== 'string') throw new Error(`fetch.text ${this._options.url}, string expected`)
            return state
        }

        throw this._createException(`${opts.method || 'GET'} ${opts.fullUrl}`, fetcher.request(opts))
    }

    _createException<V>(debugStr: string, promise: Promise<V>): Promise<V> {
        return promise
    }

    json<V>(next?: V): V {
        const state: V | void = this._getState()
        if (state !== undefined) {
            if (typeof state !== 'object') throw new Error(`${this._options.url} state need an object`)
            return state
        }

        const text = this.text(next === undefined ? undefined : JSON.stringify(next, null, '\t'))

        return JSON.parse(text)
    }
}
