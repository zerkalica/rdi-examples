/* @flow */

import {Component} from 'react'
import {root, statefull} from 'reactive-di-react'
import type {SimpleMap} from 'reactive-di/interfaces/modelInterfaces'

import BaseQuery from '../common/facets/BaseQuery'
import RootComponent from '../common/components/RootComponent'
import TodoAppPage from '../todomvc/pages/TodoAppPage'

const PageMap: SimpleMap<string, Component> = {
    TodoAppPage
};

export default statefull(
    BaseQuery,
    PageMap
)(root()(RootComponent))
