/* @flow */

import {
    observable,
    setter
} from 'reactive-di-observable/annotations'
import type {Operation} from 'reactive-di-observable'
import type {
    AuthFetch
} from 'reactive-di-todomvc/auth/i'

class Session {
    isAuthorized: boolean;

    constructor(rec?: {
        isAuthorized?: boolean
    } = {}) {
        this.isAuthorized = rec.isAuthorized || false
    }
}

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

export function LoadableSession(
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
setter({
    pending: true
})(LoadableSession)

observable({
    loader: LoadableSession
})(Session)

export default Session
