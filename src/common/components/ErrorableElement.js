/* @flow */

import type {
    ErrorableElementProps,
    Element,
    DummyComponent
} from 'reactive-di-todomvc/common'

type ErrorableElementOpts = ErrorableElementProps & {
    /* @args */
    children: DummyComponent;
}

export default function ErrorableElement({children, error}: ErrorableElementOpts): Element {
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
