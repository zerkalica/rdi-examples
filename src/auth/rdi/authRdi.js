/* @flow */

import type {
    IAuthArea,
    ResetSession,
    AuthFetch
} from 'reactive-di-todomvc/auth/i'

import type {ConfigItem} from 'reactive-di'

import _ from 'babel-plugin-transform-metadata/_'

import authFetch from 'reactive-di-todomvc/auth/services/authFetch'
import resetSession from 'reactive-di-todomvc/auth/actions/resetSession'

import AuthArea from 'reactive-di-todomvc/auth/components/AuthArea'

import Session, {LoadableSession} from 'reactive-di-todomvc/auth/models/Session'

const deps: Array<ConfigItem> = [
    [(_: IAuthArea), AuthArea],
    [(_: AuthFetch), authFetch],
    [(_: ResetSession), resetSession],
    Session,
    LoadableSession
];

export default deps
