/* @flow */

import React, {Component} from 'react'

import BaseQuery from '../facets/BaseQuery'
import PageNotFoundPage from './PageNotFoundPage'

export type AppComponentProps = {
    Widget: ?Component;
}

export default class RootComponent extends Component<void, AppComponentProps, void> {
    render(): ReactElement {
        const {
            Widget
        } = this.props

        return Widget
            ? <Widget />
            : <PageNotFoundPage />
    }
}
