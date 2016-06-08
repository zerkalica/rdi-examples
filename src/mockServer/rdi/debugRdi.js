/* @flow */

import type {
    Fetch
} from 'reactive-di-todomvc/common/i'

import type {ConfigItem} from 'reactive-di'

import type {IErrorRate} from 'reactive-di-todomvc/mockServer/components/ErrorRate'
import type {
    ChangeEditing,
    ErrorRateValue
} from 'reactive-di-todomvc/mockServer/i'

import _ from 'babel-plugin-transform-metadata/_'
import {observable} from 'reactive-di-observable/configurations'

import ErrorRate from 'reactive-di-todomvc/mockServer/components/ErrorRate'
import changeEditing from 'reactive-di-todomvc/mockServer/actions/changeEditing'
import storageFetch from 'reactive-di-todomvc/mockServer/services/storageFetch'

const config: ConfigItem[] = [
    [(_: IErrorRate), ErrorRate],
    observable((_: ErrorRateValue), {
        value: 20
    }),
    [(_: Fetch), storageFetch],
    [(_: ChangeEditing), changeEditing]
]

export default config
