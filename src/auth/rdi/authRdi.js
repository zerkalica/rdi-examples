/* @flow */

import type {
    ILoginPage,
    IAuthArea,
    Login,
    Logout,
    ChangeLoginData,
    ResetSession,
    AuthFetch
} from 'reactive-di-todomvc/auth'

import type {ConfigItem} from 'reactive-di'

import _ from 'babel-plugin-transform-metadata/_'

import authFetch from 'reactive-di-todomvc/auth/services/authFetch'
import resetSession from 'reactive-di-todomvc/auth/actions/resetSession'

import LoginPage from 'reactive-di-todomvc/auth/components/LoginPage'
import AuthArea from 'reactive-di-todomvc/auth/components/AuthArea'

import login from 'reactive-di-todomvc/auth/actions/login'
import logout from 'reactive-di-todomvc/auth/actions/logout'
import changeLoginData from 'reactive-di-todomvc/auth/actions/changeLoginData'

const deps: Array<ConfigItem> = [
    [(_: IAuthArea), AuthArea],
    [(_: ILoginPage), LoginPage],
    [(_: AuthFetch), authFetch],
    [(_: ResetSession), resetSession],
    [(_: Login), login],
    [(_: Logout), logout],
    [(_: ChangeLoginData), changeLoginData]
];

export default deps
