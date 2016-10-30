// @flow

import LoaderTheme from './LoaderTheme'

interface LoaderState {
    theme: LoaderTheme;
}

export default function LoaderView(
    props: {
        small?: boolean
    },
    {theme}: LoaderState
) {
    return <div className={props.small ? theme.smallContainer : theme.container}>
        <i className={props.small ? theme.smallSpinner : theme.spinner} />
    </div>
}
