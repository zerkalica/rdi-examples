/* @flow */
import type {
    Operation
} from 'reactive-di-observable'
import type {
    AnonymFetch
} from 'reactive-di-todomvc/common'

import Session from 'reactive-di-todomvc/auth/models/Session'
import LoginErrors from 'reactive-di-todomvc/auth/models/LoginErrors'
import LoginData from 'reactive-di-todomvc/auth/models/LoginData'

export default function login(
    fetch: AnonymFetch,
    loader: Session,
    /* @args */
    props: LoginData
): Operation[] {
    const errors = new LoginErrors(props);

    if (errors.isError) {
        return [
            {object: errors}
        ]
    }

    return [
        {object: errors},
        {
            promise: () => fetch('session', {
                method: 'PUT',
                json: props
            }).then(loader)
        }
    ]
}
