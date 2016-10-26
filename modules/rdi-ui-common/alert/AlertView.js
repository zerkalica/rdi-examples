// @flow

import AlertTheme from './AlertTheme'
import type {AlertType} from './AlertTheme'

interface AlertProps {
    children?: ?mixed;
    type?: AlertType;
    message?: string;
}

interface AlertState {
    theme: AlertTheme;
}

export default function AlertView(
    {
        type,
        children
    }: AlertProps,
    {
        theme
    }: AlertState
) {
    return <div className={theme.alertType(type)} role="alert">
        {(children instanceof Error ? children.message : children) || 'Unknown error'}
    </div>
}
