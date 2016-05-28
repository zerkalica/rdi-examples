/* @flow */
import type {
    Operation
} from 'reactive-di-observable'
import type {
    AnonymFetch
} from 'reactive-di-todomvc/common'

import SessionLoader from 'reactive-di-todomvc/auth/loaders/SessionLoader'

export default function logout(
    fetch: AnonymFetch,
    loader: SessionLoader
): Operation[] {
    return [
        {
            promise: () => fetch('session', {
                method: 'DELETE'
            }).then(loader)
        }
    ]
}
