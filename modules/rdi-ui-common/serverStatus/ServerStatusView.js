// @flow
import {UpdaterStatus} from 'reactive-di'

import type {AlertType} from 'rdi-ui-common/alert/AlertTheme'
import AlertView from 'rdi-ui-common/alert/AlertView'
import AlertLinkView from 'rdi-ui-common/alert/AlertLinkView'

import ServerLoadingLang from '../serverLoading/ServerLoadingLang'

interface ServerLoadingProps {
    status: UpdaterStatus;
}

interface ServerLoadingState {
    lang: ServerLoadingLang;
}

export default function ServerStatusView(
    {status}: ServerLoadingProps,
    {lang}: ServerLoadingState
) {
    let type: AlertType = 'success'
    if (status.pending) {
        type = 'warning'
    }
    if (status.error) {
        type = 'error'
    }

    return <AlertView type={type}>
        {status.error
            ? lang.getMessage(status.error)
            : status.pending ? 'Pending' : 'All Ok'
        }
        {status.retry
            ? <AlertLinkView onClick={status.retry}>{lang.retry}</AlertLinkView>
            : null
        }
    </AlertView>
}
