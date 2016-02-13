/* @flow */

import React, {Component} from 'react'
import type {SimpleMap} from 'reactive-di/interfaces/modelInterfaces'

import BaseQuery from '../facets/BaseQuery'
import PageNotFoundPage from './PageNotFoundPage'

export type AppComponentProps = {
    baseQuery: BaseQuery;
    PageMap: SimpleMap<string, Component>;
}

export default class RootComponent extends Component<void, AppComponentProps, void> {
    render(): ReactElement {
        const {
            baseQuery,
            PageMap
        } = this.props
        const Widget: ?Component = PageMap[baseQuery.page];

        return Widget
            ? <Widget />
            : <PageNotFoundPage name={baseQuery.page} />
    }
}
