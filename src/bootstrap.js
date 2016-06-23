/* @flow */

import 'babel-polyfill'

import _ from 'babel-plugin-transform-metadata/_'
import authRdi from 'reactive-di-todomvc/auth/rdi/authRdi'
import commonRdi from 'reactive-di-todomvc/common/rdi/commonRdi'
import debugRdi from 'reactive-di-todomvc/mockServer/rdi/debugRdi'
import jss from 'jss'
import todoRdi from 'reactive-di-todomvc/todo/rdi/todoRdi'
import AbstractStorage from 'reactive-di-todomvc/common/services/AbstractStorage'
import BaseEnv from 'reactive-di-todomvc/common/models/BaseEnv'
import DebugConfig from 'reactive-di-todomvc/common/models/DebugConfig'
import FetcherConfig from 'reactive-di-todomvc/common/models/FetcherConfig'
import Translations from 'reactive-di-todomvc/common/models/Translations'
import type {RouterConfig, RouterManager, PageMap} from 'modern-router'
import {
    AbstractLocation,
    PageNotFoundError,
    RouterManagerFactory,
    Route,
    RouterObserver
} from 'modern-router'
import {Resolution} from 'observable-helpers'
import {observableFromEvent} from 'observable-helpers/browser'
import type {
    ConfigItem,
    CreateContainerManager,
    Container,
    ContainerManager
} from 'reactive-di'
import {
    createManagerFactory,
    defaultPlugins,
    createHotRelationUpdater
} from 'reactive-di'
import type {Renderer} from 'reactive-di-observable'
import {
    SetterPlugin,
    ComputedPlugin,
    MetaPlugin,
    ObservablePlugin,
    ThemePlugin,
    ComponentPlugin
} from 'reactive-di-observable'
import {observable} from 'reactive-di-observable/configurations'
import {createReactWidget} from 'reactive-di-react'
import type {IErrorPage} from 'reactive-di-todomvc/common/i'
import type {ITodoPage} from 'reactive-di-todomvc/todo/i'
import {value} from 'reactive-di/configurations'

const ErrorPage: mixed = (_: IErrorPage)

const pages: PageMap = {
    TodoPage: (_: ITodoPage)
};

const appDeps: ConfigItem[] = [].concat(
    todoRdi,
    commonRdi,
    debugRdi,
    authRdi,
    [
        [(_: RouterManager), value()],
        [Resolution, observable()],
        [Route, observable()]
    ]
)

export interface Config {
    DebugConfig: DebugConfig;
    Translations: Translations;
    FetcherConfig: FetcherConfig;
    RouterConfig: RouterConfig;
    state: [string, mixed][];
}

export default class Bootstrap<Widget> {
    _createRenderer: (container: Container) => Renderer;
    _routerFactory: RouterManagerFactory;
    _cm: ContainerManager;
    _config: [string, mixed][];

    constructor(config: Config) {
        this._routerFactory = new RouterManagerFactory(config.RouterConfig, pages, ErrorPage)

        const normalizedConfig: [string, mixed][] = []
        const keys: string[] = Object.keys(config)
        for (let i = 0, l = keys.length; i < l; i++) {
            const key: string = keys[i]
            normalizedConfig.push([key, (config: any)[key]])
        }
        this._config = normalizedConfig

        const createCm = createManagerFactory(
            defaultPlugins.concat([
                new SetterPlugin(),
                new ComputedPlugin(),
                new MetaPlugin(),
                new ObservablePlugin(),
                new ThemePlugin((styles) => jss.createStyleSheet(styles)),
                new ComponentPlugin(createReactWidget)
            ]),
            createHotRelationUpdater
        )

        this._cm = createCm(appDeps)
    }

    start(
        location: AbstractLocation,
        createRenderer: (container: Container) => Renderer,
        values: [mixed, mixed][]
    ): () => void {
        const {_config: config} = this
        const factory = this._routerFactory
        const rm = factory.create(location)
        const container: Container = this._cm.createContainer(null, config.concat(values, [
            [(_: RouterManager), rm],
            [Route, rm.route],
        ]))
        return factory.start(
            rm.route,
            createRenderer(container)
        )
    }
}
