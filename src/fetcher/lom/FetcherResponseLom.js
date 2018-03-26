// @flow

import {mem, AtomWait} from 'lom_atom'

import FetcherResponse from '../FetcherResponse'

export default class FetcherResponseLom extends FetcherResponse {
    @mem text<V: string | Error | FormData>(next?: V): V {
        return super.text(next)
    }

    _createException(debugStr: string, promise: Promise<*>): Error {
        return new AtomWait(debugStr, promise)
    }
}
