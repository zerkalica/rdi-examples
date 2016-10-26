// @flow

import LoaderTheme from './LoaderTheme'

interface LoaderState {
    theme: LoaderTheme;
}

export default function LoaderView(
    props: {},
    {theme}: LoaderState
) {
    return <div className={theme.container}>
        <i className={theme.spinner} />
    </div>
}
