/* @flow */
import type {
    Container,
    ConfigItem,
    ContainerManager,
    CreateContainerManager
} from 'reactive-di'

import {
    createManagerFactory,
    defaultPlugins,
    createHotRelationUpdater
} from 'reactive-di'

import {observablePlugins} from 'reactive-di-observable'
import {ReactPlugin} from 'reactive-di-react'

import todoRdi from 'reactive-di-todomvc/todo/rdi/todoRdi'
import commonRdi from 'reactive-di-todomvc/common/rdi/commonRdi'

const deps: Array<ConfigItem> = [].concat(
    todoRdi,
    commonRdi
);

export default function createObserver(config: Array<ConfigItem>): Container {
    const createContainerManager: CreateContainerManager = createManagerFactory(
        defaultPlugins.concat([ReactPlugin], observablePlugins),
        createHotRelationUpdater
    );
    const appCm: ContainerManager = createContainerManager(deps.concat(config));

    return appCm.createContainer()
}
