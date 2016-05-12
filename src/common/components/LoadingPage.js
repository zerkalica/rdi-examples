/* @flow */
import type {
    FlowFix,
    Element
} from 'reactive-di-todomvc/common'

export type ILoadingPage = FlowFix<void>;

export default function LoadingPage(): Element {
    return (
        <div className="page-loading">
            <h1>Loading...</h1>
        </div>
    )
}
