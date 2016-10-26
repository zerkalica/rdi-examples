// @flow

import AlertLinkTheme from './AlertLinkTheme'

interface AlertLinkProps {
    children?: ?mixed;
    onClick: ?() => void;
}

interface AlertState {
    theme: AlertLinkTheme;
}

export default function AlertLinkView(
    {
        onClick,
        children
    }: AlertLinkProps,
    {
        theme
    }: AlertState
) {
    return <button
        onClick={(e: Event) => {
            e.stopPropagation()
            if (onClick) {
                onClick()
            }
        }}
        className={theme.link}
    >
        {children}
    </button>
}
