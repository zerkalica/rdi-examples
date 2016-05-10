/* @flow */
import {component} from 'reactive-di-react/annotations'

type ErrorableElementProps = {
    /* @args */
    children: React$Element;
    error?: React$Element;
}

export default function ErrorableElement({children, error}: ErrorableElementProps) {
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
component(ErrorableElement)
