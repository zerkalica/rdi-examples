/* @flow */

import type {Meta} from 'reactive-di-observable/i/interfaces'
import type {Element} from 'reactive-di-react/i/interfaces'
import type {Tr} from 'reactive-di-todomvc/i/commonInterfaces'

type TodoPageLoadingStateProps = {
    tr: Tr;
    meta: Meta;
}

export default function TodoPageLoadingState({
    meta,
    tr
}: TodoPageLoadingStateProps): Element {
    return (
        <div className="TodoPageLoadingState">
            {meta.pending ?
                <div className="todoloader">
                    <h3>{tr('Pending...')}</h3>
                </div>
            : null}
            {meta.rejected ?
                <div className="todoerror">
                    {meta.reason ? meta.reason.message : tr('Unknown error')}
                </div>
            : null}
        </div>
    )
}
