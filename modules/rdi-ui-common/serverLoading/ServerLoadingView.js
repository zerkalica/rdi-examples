// @flow
import {SourceStatus, RecoverableError} from 'reactive-di'

import LoaderView from 'rdi-ui-common/loader/LoaderView'
import AlertView from 'rdi-ui-common/alert/AlertView'
import AlertLinkView from 'rdi-ui-common/alert/AlertLinkView'

import ServerLoadingLang from './ServerLoadingLang'

type ServerLoadingProps = {
    status: SourceStatus;
    noIndicator?: boolean;
    smallIndicator?: boolean;
}

interface ServerLoadingState {
    lang: ServerLoadingLang;
}

export default function ServerLoadingView(
    {
        status,
        noIndicator,
        smallIndicator
    }: ServerLoadingProps,
    {
        lang
    }: ServerLoadingState
) {
    if (status.error) {
        return <AlertView type="error">
            {lang.getMessage(status.error)}
            {status.error instanceof RecoverableError ?
                <AlertLinkView
                    onClick={status.error.retry}
                >{lang.retry}</AlertLinkView>
            : null}
        </AlertView>
    }

    if (!noIndicator && status.pending) {
        return <LoaderView small={smallIndicator} />
    }

    return null
}
