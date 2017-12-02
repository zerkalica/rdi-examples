// @flow

import {action, mem} from 'lom_atom'
import {props, theme} from 'reactive-di'
class Store {
    @mem red = 140
}

class CssChangeTheme {
    _store: Store

    constructor(store: Store) {
        this._store = store
    }

    @mem @theme.self get css() {
        const store = this._store
        return {
            wrapper: {
                background: `rgb(${store.red}, 0, 0)`
            }
        }
    }
}

export function CssChangeView(
    {id}: {id: string},
    {store, theme: {css}}: { theme: CssChangeTheme, store: Store}
) {
    return <div className={css.wrapper} id={id}>
        color via css {store.red}: <input
            id="range"
            type="range"
            min="0"
            max="255"
            value={store.red}
            onInput={({target}) => { store.red = Number(target.value) }}
        />
    </div>
}
