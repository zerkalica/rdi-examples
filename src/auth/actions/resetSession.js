/* @flow */
import type {
    Operation
} from 'reactive-di-observable'

import Session from 'reactive-di-todomvc/auth/models/Session'

import {setter} from 'reactive-di-observable/annotations'

export default function resetSession(): Operation[] {
    return [
        {object: new Session()}
    ]
}
setter()(resetSession)
