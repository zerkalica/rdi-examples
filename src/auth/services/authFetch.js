/* @flow */
import type {
    AnonymFetch,
    FetchParams
} from 'reactive-di-todomvc/common/i'

import type {
    ResetSession
} from 'reactive-di-todomvc/auth/i'

import {compose} from 'reactive-di/annotations'

import AuthError from 'reactive-di-todomvc/common/errors/AuthError'

export default function authFetch<V>(
    fetch: AnonymFetch,
    resetSession: ResetSession,
    /* @args */
    url: string,
    params: FetchParams
): Promise<V> {
    return fetch(url, params)
        .catch((err: Error) => {
            if (err instanceof AuthError) {
                resetSession()
            }
            throw err
        })
}
compose()(authFetch)
