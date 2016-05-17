/* @flow */
import FetcherConfig from 'reactive-di-todomvc/common/models/FetcherConfig'
import type {
    AnonymFetch,
    FetchParams
} from 'reactive-di-todomvc/common'

import type {
    ShowLoginForm
} from 'reactive-di-todomvc/auth'

import AuthError from 'reactive-di-todomvc/common/errors/AuthError'

export default function authFetch<V>(
    {apiPrefix}: FetcherConfig,
    fetch: AnonymFetch,
    showLoginForm: ShowLoginForm,
    /* @args */
    url: string,
    params: FetchParams
): Promise<V> {
    return fetch(url, params)
        .catch((err: Error) => err instanceof AuthError ? showLoginForm() : null)
}
