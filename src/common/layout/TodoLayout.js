// @flow

import {SourceStatus} from 'reactive-di'

import {RdiLayoutView, ServerLoadingView} from 'rdi-ui-common'
import NavView from 'rdi-todo/common/nav/NavView'
import TodoLayoutTheme from './TodoLayoutTheme'

interface TodoLayoutProps {
    status?: SourceStatus;
    children?: mixed;
}

interface TodoLayoutState {
    theme: TodoLayoutTheme;
}

export default function TodoLayout(
    {
        status,
        children
    }: TodoLayoutProps,
    {
        theme
    }: TodoLayoutState
) {
    return <RdiLayoutView>
        <NavView/>
        <div className={theme.content}>
            {(status && !status.complete)
                ? <ServerLoadingView status={status} />
                : children
            }
        </div>
    </RdiLayoutView>
}
