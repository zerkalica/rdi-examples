// @flow
import {
    AbstractLocation,
    RouterManager,
    SusaninRouter,
    Route,
    RouterConfig
} from 'modern-router'

import {source} from 'reactive-di/annotations'

source({key: 'Route'})(Route)
source({key: 'RouterConfig', construct: true})(RouterConfig)
source({key: 'AbstractLocation'})(AbstractLocation)

export default function createRouterManager(
    config: RouterConfig,
    loc: AbstractLocation
): RouterManager {
    return new RouterManager(
        loc,
        new SusaninRouter(config, loc.getParams())
    )
}
