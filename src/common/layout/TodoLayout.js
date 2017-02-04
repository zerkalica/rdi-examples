// @flow

import {SourceStatus} from 'reactive-di'

import {RdiLayoutView, ServerLoadingView} from 'rdi-ui-common'
import NavView from 'rdi-todo/common/nav/NavView'
import TodoLayoutTheme from './TodoLayoutTheme'
import TodoLayoutService from './TodoLayoutService'

interface TodoLayoutProps {
    status?: SourceStatus;
    children?: mixed;
}

interface TodoLayoutState {
    theme: TodoLayoutTheme;
    service: TodoLayoutService;
}

export default function TodoLayout(
    {
        status,
        children
    }: TodoLayoutProps,
    {
        service,
        theme
    }: TodoLayoutState
) {
    return <RdiLayoutView>
        <NavView/>
        <div className={theme.content}>
            {status && !status.complete && (service.isFirstRun() || status.error)
                ? <ServerLoadingView status={status} />
                : children
            }
        </div>
    </RdiLayoutView>
}
