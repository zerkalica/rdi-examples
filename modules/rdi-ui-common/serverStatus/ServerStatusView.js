// @flow
import {SourceStatus} from 'reactive-di'

import type {AlertType} from 'rdi-ui-common/alert/AlertTheme'

import ServerLoadingLang from '../serverLoading/ServerLoadingLang'
import ServerStatusTheme from './ServerStatusTheme'

interface ServerLoadingProps {
    status: SourceStatus;
}

interface ServerLoadingState {
    lang: ServerLoadingLang;
    theme: ServerStatusTheme;
}

export default function ServerStatusView(
    {status}: ServerLoadingProps,
    {lang, theme}: ServerLoadingState
) {
    let type: AlertType = 'success'
    if (status.error) {
        type = 'error'
    } else if (status.pending) {
        type = 'warning'
    }

    return <div className={theme.alertType(type)}>
        {status.error
            ? lang.getMessage(status.error)
            : status.pending ? 'Pending' : 'All Ok'
        }
    </div>
}
