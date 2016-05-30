/* @flow */
import type {
    Operation
} from 'reactive-di-observable'
import type {
    AnonymFetch
} from 'reactive-di-todomvc/common'

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
