/* @flow */

import type {
    Fetch
} from 'reactive-di-todomvc/common'

import type {ConfigItem} from 'reactive-di'

import type {IErrorRate} from 'reactive-di-todomvc/mockServer/components/ErrorRate'
import type {
    ChangeEditing,
    ErrorRateValue
} from 'reactive-di-todomvc/mockServer'

import _ from 'babel-plugin-transform-metadata/_'
import {
    observable,
    setter
} from 'reactive-di-observable/configurations'
import {component} from 'reactive-di-react/configurations'
import {factory} from 'reactive-di/configurations'

import ErrorRate from 'reactive-di-todomvc/mockServer/components/ErrorRate'
import changeEditing from 'reactive-di-todomvc/mockServer/actions/changeEditing'
import storageFetch from 'reactive-di-todomvc/mockServer/services/storageFetch'

const config: ConfigItem[] = [
    [(_: IErrorRate), component(ErrorRate)],
    observable((_: ErrorRateValue), {
        value: 20
    }),
    [(_: Fetch), factory(storageFetch)],

    [(_: ChangeEditing), setter(changeEditing)]
]

export default config
