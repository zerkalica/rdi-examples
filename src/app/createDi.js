/* @flow */

import {createPureStateDi} from 'reactive-di'
import type {GetDep} from 'reactive-di/i/diInterfaces'

import AppState from 'reactive-di-todomvc/app/AppState'
import BaseEnv from 'reactive-di-todomvc/common/models/BaseEnv'
import CommonState from 'reactive-di-todomvc/common/models/CommonState'
import ConfigState from 'reactive-di-todomvc/app/ConfigState'

export default function createDi(baseEnv: BaseEnv, config: Object = {}): GetDep {
    return createPureStateDi(new AppState({
        commonState: new CommonState({
            baseEnv
        }),
        config: new ConfigState({
            debug: config.debug
        })
    }))
}
