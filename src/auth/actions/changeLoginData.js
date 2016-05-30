/* @flow */

import type {Operation} from 'reactive-di-observable'
import LoginData from 'reactive-di-todomvc/auth/models/LoginData'

import m from 'reactive-di-todomvc/common/helpers/merge'

import {setter} from 'reactive-di-observable/annotations'

export default function changeLoginData(
    data: LoginData,
    /* @args */
    prop: {[id: string]: string}
): Operation[] {
    return [
        {object: m(data, prop)}
    ]
}
setter()(changeLoginData)
