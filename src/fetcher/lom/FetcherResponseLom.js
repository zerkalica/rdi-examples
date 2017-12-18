// @flow

import {mem, AtomWait} from 'lom_atom'

import FetcherResponse from '../FetcherResponse'

export default class FetcherResponseLom extends FetcherResponse {
    static WaitError: Class<Error> = AtomWait
    @mem text<V: string | Error | FormData>(next?: V): V {
        return super.text(next)
    }

    _getRetry() {
        return mem.getRetry(this.text())
    }

    _setData(data: string) {
        mem.cache(this.text(data))
    }
}
