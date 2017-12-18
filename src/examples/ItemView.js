// @flow
import {theme} from 'reactive-di'

class KeyValueTheme {
    @theme get css() {
        return {
            item: {
                display: 'flex'
            },
            key: {
                width: '20%'
            },
            value: {
                width: '80%'
            }
        }
    }
}

function KeyView(
    {children}: {children?: any},
    {theme: {css}}: {theme: KeyValueTheme}
) {
    return <div class={css.key}>{children}</div>
}

function ValueView(
    {children}: {children?: any},
    {theme: {css}}: {theme: KeyValueTheme}
) {
    return <div class={css.value}>{children}</div>
}

export default function ItemView(
    {children}: {children?: any},
    {theme: {css}}: {theme: KeyValueTheme}
) {
    return <div class={css.item}>{children}</div>
}
ItemView.Key = KeyView
ItemView.Value = ValueView
