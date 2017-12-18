// @flow
import {mem} from 'lom_atom'

import Fetcher from '../Fetcher'
import FetcherResponseLom from './FetcherResponseLom'
import type {FetcherApi} from '../interfaces'

export default class FetcherLom extends Fetcher {
    @mem.key _request([method, url]: [string, string]): FetcherApi {
        return new FetcherResponseLom(method, url, this.getFullUrl(url), this)
    }
}
