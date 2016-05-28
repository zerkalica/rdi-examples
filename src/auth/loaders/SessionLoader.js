/* @flow */

import type {
    AuthFetch
} from 'reactive-di-todomvc/auth'

import type {Operation} from 'reactive-di-observable'

import Session from 'reactive-di-todomvc/auth/models/Session'

function normalizeSession(rec: {
    isAuthorized: boolean
}): Array<Operation> {
    return [
        {
            object: new Session({
                isAuthorized: rec.isAuthorized
            })
        }
    ]
}

export default function SessionLoader(
    fetch: AuthFetch
): Array<Operation> {
    return [
        {
            promise: () => fetch('session', {
                method: 'GET'
            }).then(normalizeSession)
        }
    ]
}
