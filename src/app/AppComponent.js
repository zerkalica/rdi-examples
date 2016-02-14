/* @flow */

import {Component} from 'react'
import {root, statefull} from 'reactive-di-react'
import type {SimpleMap} from 'reactive-di/interfaces/modelInterfaces'

import rdi from '../common/annotations'
import BaseQuery from '../common/facets/BaseQuery'
import RootComponent from '../common/components/RootComponent'
import TodoAppPage from '../todomvc/pages/TodoAppPage'

const defaultPageMap: SimpleMap<string, Component> = {
    TodoAppPage
};

class RootFacet {
    Widget: ?Component;

    constructor(baseQuery: BaseQuery = {}) {
        this.Widget = defaultPageMap[baseQuery.page]
    }
}
rdi.klass(BaseQuery)(RootFacet)

export default root()(statefull(RootFacet)(RootComponent))
