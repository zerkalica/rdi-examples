/* @flow */
type ErrorableElementProps = {
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
