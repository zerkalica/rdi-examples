/* @flow */

import type {
    ILoginPage,
    IAuthArea,
    AuthMeta,
    Login,
    Logout,
    ChangeLoginData,
    ResetSession,
    AuthFetch
} from 'reactive-di-todomvc/auth'

import type {ConfigItem} from 'reactive-di'

import _ from 'babel-plugin-transform-metadata/_'

import authFetch from 'reactive-di-todomvc/auth/services/authFetch'
import {compose} from 'reactive-di/configurations'
import {
    meta,
    setter,
    observable
} from 'reactive-di-observable/configurations'
import {component} from 'reactive-di-react/configurations'
import resetSession from 'reactive-di-todomvc/auth/actions/resetSession'

import Session from 'reactive-di-todomvc/auth/models/Session'
import SessionLoader from 'reactive-di-todomvc/auth/loaders/SessionLoader'

import LoginPage from 'reactive-di-todomvc/auth/components/LoginPage'
import AuthArea from 'reactive-di-todomvc/auth/components/AuthArea'

import login from 'reactive-di-todomvc/auth/actions/login'
import logout from 'reactive-di-todomvc/auth/actions/logout'
import changeLoginData from 'reactive-di-todomvc/auth/actions/changeLoginData'

import LoginData from 'reactive-di-todomvc/auth/models/LoginData'
import LoginErrors from 'reactive-di-todomvc/auth/models/LoginErrors'

const deps: Array<ConfigItem> = [
    [(_: IAuthArea), component(AuthArea)],
    [(_: ILoginPage), component(LoginPage)],
    meta((_: AuthMeta),
        SessionLoader
    ),
    setter(SessionLoader),

    observable(LoginData),
    observable(LoginErrors),
    observable(Session, {
        pending: true,
        loader: SessionLoader
    }),

    [(_: AuthFetch), compose(authFetch)],

    [(_: ResetSession), setter(resetSession)],
    [(_: Login), setter(login)],
    [(_: Logout), setter(logout)],
    [(_: ChangeLoginData), setter(changeLoginData)]
];

export default deps
