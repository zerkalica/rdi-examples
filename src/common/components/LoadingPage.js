/* @flow */
import React, {Component} from 'react'

type LoadingPageProps = {
}

export default class LoadingPage extends Component<void, LoadingPageProps, void> {
    render(): ReactElement { // eslint-disable-line
        const {
    } = this.props

        return (
            <div className="page-loading">
                <h1>Loading...</h1>
            </div>
        )
    }
}
