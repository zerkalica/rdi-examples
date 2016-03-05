/* @flow */

import merge from 'node-config-loader/utils/merge'
import AppState from 'reactive-di-todomvc/app/models/AppState'
import BaseEnv from 'reactive-di-todomvc/common/models/BaseEnv'
import BaseQuery from 'reactive-di-todomvc/common/models/BaseQuery'
import CommonState from 'reactive-di-todomvc/common/models/CommonState'
import ConfigState from 'reactive-di-todomvc/app/models/ConfigState'

export default function createState(
    baseEnv: BaseEnv,
    baseQuery: BaseQuery,
    staticConfig: Object = {},
    runtimeConfig: Object = {}
): AppState {
    const config: Object = merge(staticConfig, runtimeConfig);

    return new AppState({
        commonState: new CommonState({
            baseEnv,
            baseQuery
        }),
        config: new ConfigState({
            debug: config.debug
        })
    })
}
