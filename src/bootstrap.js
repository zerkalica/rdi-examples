/* @flow */

import 'babel-polyfill'

import jss from 'jss'

import _ from 'babel-plugin-transform-metadata/_'

import type {
    AbstractLocation,
    RouterManager,
    PageRec,
    LocationData
} from 'modern-router'
import {
    RouterConfig,
    RouterManagerFactory,
    SusaninRouter,
    Route
} from 'modern-router'

import {
    Resolution,
    mapObservable
} from 'observable-helpers'

import type {
    ConfigItem,
    Container,
    CreateContainerManager,
    ContainerManager
} from 'reactive-di'
import {
    createManagerFactory,
    defaultPlugins
} from 'reactive-di'
import {value} from 'reactive-di/configurations'
import {factory} from 'reactive-di/annotations'

import type {
    Operation
} from 'reactive-di-observable'
import {
    SetterPlugin,
    ComputedPlugin,
    MetaPlugin,
    ObservablePlugin,
    ThemePlugin,
    ComponentPlugin
} from 'reactive-di-observable'
import {observable} from 'reactive-di-observable/configurations'
import {setter} from 'reactive-di-observable/annotations'

import {createReactWidget} from 'reactive-di-react'

import type {IErrorPage} from 'reactive-di-todomvc/common/i'
import commonRdi from 'reactive-di-todomvc/common/rdi/commonRdi'

import authRdi from 'reactive-di-todomvc/auth/rdi/authRdi'

import debugRdi from 'reactive-di-todomvc/mockServer/rdi/debugRdi'

import type {ITodoPage} from 'reactive-di-todomvc/todo/i'
import todoRdi from 'reactive-di-todomvc/todo/rdi/todoRdi'

import FallbackPage from 'reactive-di-todomvc/common/components/FallbackPage'

export const pages: PageRec = {
    ErrorPage: (_: IErrorPage),
    FallbackPage,
    pages: {
        TodoPage: (_: ITodoPage)
    }
}

export function createRouterManager(
    rmf: RouterManagerFactory,
    loc: AbstractLocation
): RouterManager {
    return rmf.create(loc)
}
factory()(createRouterManager)

function routeToTransaction(route: Route): Operation[] {
    return [
        {object: route}
    ]
}
export function routeLoader(manager: RouterManager): Operation[] {
    return [
        {object: manager.route},
        {
            observable: () => mapObservable(Observable.from(manager.route), routeToTransaction)
        }
    ]
}
setter()(routeLoader)

export function createRouterManagerFactory(config: RouterConfig): RouterManagerFactory {
    return new RouterManagerFactory((params: LocationData) => new SusaninRouter(config, params))
}
factory()(createRouterManagerFactory)

const appDeps: ConfigItem[] = [].concat(
    todoRdi,
    commonRdi,
    debugRdi,
    authRdi,
    [
        [RouterConfig, observable({key: 'RouterConfig'})],
        [(_: AbstractLocation), value()],
        [RouterManagerFactory, createRouterManagerFactory],
        [(_: RouterManager), createRouterManager],
        [Resolution, observable()],
        routeLoader,
        [Route, observable({loader: routeLoader})]
    ]
)

const createCm: CreateContainerManager = createManagerFactory(
    defaultPlugins.concat([
        new SetterPlugin(),
        new ComputedPlugin(),
        new MetaPlugin(),
        new ObservablePlugin(),
        new ThemePlugin((styles) => jss.createStyleSheet(styles)),
        new ComponentPlugin(createReactWidget)
    ])
)

export function bootstrap(
    rawConf: {[id: string]: mixed}
): (values: [string, mixed][]) => Container {
    const config: [string, mixed][] = []
    const keys: string[] = Object.keys(rawConf)
    for (let i = 0, l = keys.length; i < l; i++) {
        const key: string = keys[i]
        config.push([key, (rawConf)[key]])
    }
    const cm: ContainerManager = createCm(appDeps)
    return (values: [string, mixed][]) => cm.createContainer(null, config.concat(values))
}
