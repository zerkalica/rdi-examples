/* @flow */
import React, {Component} from 'react'

type PageNotFoundPageProps = {
}

export default class PageNotFoundPage extends Component<void, PageNotFoundPageProps, void> {
    render(): ReactElement { // eslint-disable-line
        const {
        } = this.props

        return (
            <div className="page-not-found">
                <h1>Page not found</h1>
            </div>
        )
    }
}
