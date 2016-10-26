// @flow

import AlertLinkTheme from './AlertLinkTheme'

interface AlertLinkProps {
    children?: ?mixed;
    onClick: () => void;
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
    return <a
        href="./"
        onClick={(e: Event) => {
            e.stopPropagation()
            onClick()
        }}
        className={theme.link}
    >
        {children}
    </a>
}
