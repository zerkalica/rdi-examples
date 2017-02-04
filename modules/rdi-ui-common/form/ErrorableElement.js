// @flow
import ErrorableElementTheme from './ErrorableElementTheme'
import type {ErrorSide} from './ErrorableElementTheme'

export interface ErrorableElementProps {
    error?: ?string;
    errorSide?: ErrorSide;
    children?: ?mixed;
    className?: string;
}

interface ErrorableElementState {
    theme: ErrorableElementTheme;
}

export default function ErrorableElement(
    {
        className,
        children,
        error,
        errorSide
    }: ErrorableElementProps,
    {
        theme
    }: ErrorableElementState
) {
    return <span className={theme.wrapper}>
        {children}
        {error
            ? <div className={theme.message(errorSide)}>{error}</div>
            : null
        }
    </span>
}
