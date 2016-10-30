// @flow
import {UpdaterStatus} from 'reactive-di'

import LoaderView from 'rdi-ui-common/loader/LoaderView'
import AlertView from 'rdi-ui-common/alert/AlertView'
import AlertLinkView from 'rdi-ui-common/alert/AlertLinkView'

import ServerLoadingLang from './ServerLoadingLang'

interface ServerLoadingProps {
    status: UpdaterStatus;
    // FlowFixMe jsx error with boolean shortland prop
    noIndicator?: any;
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
            <AlertLinkView
                onClick={status.retry}
            >{lang.retry}</AlertLinkView>
        </AlertView>
    }

    if (!noIndicator && status.pending) {
        return <LoaderView small={smallIndicator} />
    }

    return null
}
