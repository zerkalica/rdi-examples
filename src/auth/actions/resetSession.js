/* @flow */
import type {
    Operation
} from 'reactive-di-observable'

import Session from 'reactive-di-todomvc/auth/models/Session'

export default function resetSession(): Operation[] {
    return [
        {object: new Session()}
    ]
}
