/* @flow */

import type {
    AuthFetch,
    ShowLoginForm
} from 'reactive-di-todomvc/auth'

import type {ConfigItem} from 'reactive-di'

import _ from 'babel-plugin-transform-metadata/_'

import authFetch from 'reactive-di-todomvc/auth/services/authFetch'
import {compose} from 'reactive-di/configurations'
import {setter} from 'reactive-di-observable/configurations'
import showLoginForm from 'reactive-di-todomvc/auth/actions/showLoginForm'

const deps: Array<ConfigItem> = [
    [(_: AuthFetch), compose(authFetch)],
    [(_: ShowLoginForm), setter(showLoginForm)]
];

export default deps
