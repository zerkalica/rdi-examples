/* @flow */

import type {
    FlowFix,
    Element,
    DummyComponent
} from 'reactive-di-todomvc/common'

type Props = {
    error?: DummyComponent;
}
type ErrorableElementProps = Props & {
    /* @args */
    children: DummyComponent;
}

export type IErrorableElement = FlowFix<Props>;

export default function ErrorableElement({children, error}: ErrorableElementProps): Element {
    return (
        <div className="ErrorableElement">
            <div className="Element">
                {children}
            </div>
            {error ?
                <div className="ErrorableElementError">
                    {error}
                </div>
            : null}
        </div>
    )
}
