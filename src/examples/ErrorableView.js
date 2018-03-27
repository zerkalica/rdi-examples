// @flow
import {mem} from 'lom_atom'
import {HttpError} from '../fetcher'
import SpinnerView from '../rdi/SpinnerView'

export default function ErrorableView({
    error,
    children
}: {
    children: any,
    error: Error
}) {
    const isError = error instanceof Error
    const retry = isError ? mem.retry(error) : null
    return <SpinnerView rdi_theme isError={isError}>
        {isError
            ? <div id="error" style={{padding: '0.1em 1em'}}>
                <h3 id="error-title">{error.message}</h3>
                {retry
                    ? <div id="recover" style={{paddingBottom: '1em'}}>
                        <button id="recover-button" onClick={retry}>Retry</button>
                    </div>
                    : null
                }
            </div>
            : <div id="content" style={{pointerEvents: 'none'}}>{children}</div>
        }
    </SpinnerView>
}
