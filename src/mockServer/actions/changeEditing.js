/* @flow */

import type {
    Operation
} from 'reactive-di-observable'

import type {
    ErrorRateValue
} from 'reactive-di-todomvc/mockServer/i'

import _ from 'babel-plugin-transform-metadata/_'

export default function changeEditing(/* @args */ value: string): Array<Operation> {
    return [
        {key: (_: ErrorRateValue), value: Number(value)}
    ]
}
