/* @flow */
import type {
    Operation
} from 'reactive-di-observable'
import type {
    AnonymFetch
} from 'reactive-di-todomvc/common/i'
import {setter} from 'reactive-di-observable/annotations'

import Session from 'reactive-di-todomvc/auth/models/Session'

export default function logout(
    fetch: AnonymFetch,
    loader: Session
): Operation[] {
    return [
        {
            promise: () => fetch('session', {
                method: 'DELETE'
            }).then(loader)
        }
    ]
}
setter()(logout)
