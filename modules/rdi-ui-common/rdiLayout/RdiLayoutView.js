// @flow

import RdiLayoutTheme from './RdiLayoutTheme'

interface RdiLayoutProps {
    children?: mixed;
}

interface RdiLayoutState {
    theme: RdiLayoutTheme;
}

export default function RdiLayoutView(
    {children}: RdiLayoutProps,
    {theme}: RdiLayoutState
) {
    return <div className={theme.wrapper}>
        {children}
    </div>
}
