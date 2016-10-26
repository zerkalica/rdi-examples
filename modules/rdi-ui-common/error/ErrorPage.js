// @flow

import {DebugConfig} from 'rdi-helpers'

import ErrorTheme from './ErrorTheme'
import ErrorLang from './ErrorLang'

export interface ErrorProps {
    error: Error
}

interface ErrorState {
    theme: ErrorTheme;
    l: ErrorLang;
    debug: DebugConfig;
}

export default function ErrorPage(
    {error}: ErrorProps,
    {theme, l, debug}: ErrorState
) {
    return <div className={theme.wrapper}>
        <h1>{l.pageError}</h1>
        {l.getPageNotFound(error)}
        {debug.isEnabled
            ? <div className={theme.debug}>
                <pre className={theme.trace}>{error.stack}</pre>
            </div>
            : null
        }
    </div>
}
