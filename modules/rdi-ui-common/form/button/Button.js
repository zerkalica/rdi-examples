// @flow
import ButtonTheme from './ButtonTheme'
import type {ButtonType} from './ButtonTheme'

export interface ButtonProps {
    id: string;
    onClick: () => void;
    children: mixed;
    type?: ButtonType;
}

interface ButtonState {
    theme: ButtonTheme
}

export default function Button(
    {id, onClick, children, type}: ButtonProps,
    {theme}: ButtonState
) {
    return <button
        id={id}
        type="button"
        onClick={() => onClick()}
        className={theme.getTheme(type)}
    >
        {children}
    </button>
}
