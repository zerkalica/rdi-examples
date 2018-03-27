// @flow

import {mem, addInfo} from 'lom_atom'

import FetcherResponse from '../FetcherResponse'

export default class FetcherResponseLom extends FetcherResponse {
    @mem text<V: string | Error | FormData>(next?: V): V {
        return super.text(next)
    }

    _createException<V>(debugStr: string, promise: Promise<V>): Promise<V> {
        return addInfo(debugStr, promise)
    }
}
