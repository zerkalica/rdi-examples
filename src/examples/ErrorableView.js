// @flow
import {mem, AtomWait} from 'lom_atom'
import {HttpError} from '../fetcher'
import SpinnerView from '../rdi/SpinnerView'

const stackId = Symbol('stack_id')
export default function ErrorableView({
    error,
    children
}: {
    children: any,
    error: Error
}) {
    const errorWasShowed = (error: Object)[stackId]
    ;(error: Object)[stackId] = true
    const isWait = error instanceof AtomWait
    const retry = mem.retry(error)
    return <SpinnerView rdi_theme isError={!isWait}>
        {isWait || errorWasShowed
            ? <div id="content" style={{pointerEvents: 'none'}}>{children}</div>
            : <div id="error" style={{padding: '0.1em 1em'}}>
                <h3 id="error-title">{error.message}</h3>
                {retry
                    ? <div id="recover" style={{paddingBottom: '1em'}}>
                        <button id="recover-button" onClick={retry}>Retry</button>
                    </div>
                    : null
                }
            </div>
        }
    </SpinnerView>
}
