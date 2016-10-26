// @flow

import createFetch from './createFetch'
import createWhatwgFetch from './createWhatwgFetch'
import HttpError from './HttpError'
import FetcherConfig from './FetcherConfig'

export type {
    Fetch,
    FetchOptions
} from './createFetch'

export {
    FetcherConfig,
    HttpError,
    createFetch,
    createWhatwgFetch
}
