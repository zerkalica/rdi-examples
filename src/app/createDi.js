/* @flow */

import ReactDOM from 'react-dom'
import {createElement} from 'react'
import {createPureStateDi} from 'reactive-di'
import type {ReactiveDi} from 'reactive-di/interfaces/diInterfaces'

import rdi from '../common/annotations'
import AppComponent from './AppComponent'
import AppState from './AppState'
import BaseEnv from '../common/models/BaseEnv'
import CommonState from '../common/models/CommonState'
import ConfigState from './ConfigState'

export default function createDi(baseEnv: BaseEnv, config: Object = {}): ReactiveDi {
    const container: ReactiveDi = createPureStateDi(new AppState({
        commonState: new CommonState({
            baseEnv,
        }),
        config: new ConfigState({
            debug: config.debug
        })
    }), rdi.factory);

    return container
}
