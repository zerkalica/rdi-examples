/* @flow */

import type {
    ErrorableElementProps,
    Element
} from 'reactive-di-todomvc/common/i'

type ErrorableElementOpts = ErrorableElementProps & {
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
