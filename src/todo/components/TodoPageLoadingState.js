/* @flow */
import React from 'react'
import type {EntityMeta} from 'reactive-di/i/nodeInterfaces'
import type {Element} from 'reactive-di-react/i/interfaces'

type TodoPageLoadingStateProps = {
    meta: EntityMeta<Error>;
}
export default function TodoPageLoadingState({meta}: TodoPageLoadingStateProps): Element {
    return (
        <div className="TodoPageLoadingState">
            {meta.pending ?
                <div className="todoloader">
                    <h3>Pending...</h3>
                </div>
            : null}
            {meta.rejected ?
                <div className="todoerror">
                    {meta.reason ? meta.reason.message : 'error'}
                </div>
            : null}
        </div>
    )
}
