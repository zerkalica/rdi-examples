/* @flow */
import React, {Component} from 'react'

type PageNotFoundPageProps = {
    name: string;
}

export default class PageNotFoundPage extends Component<void, PageNotFoundPageProps, void> {
    render(): ReactElement {
        const {
            name
        } = this.props

        return (
            <div className="page-not-found">
                <h1>Page not found: {name}</h1>
            </div>
        )
    }
}
