// @flow

import {action, mem} from 'lom_atom'
import {props, theme} from 'reactive-di'
class Store {
    @mem red = 140
}

interface CssChangeInputProps {
    green: number;
    blue: number;
}

class CssChangeInputTheme {
    _store: Store
    @props props: CssChangeInputProps

    constructor(store: Store) {
        this._store = store
    }
    @mem get css() {
        const store = this._store
        return {
            wrapper: {
                '@keyframes @.pulse': {
                    '0%': {
                        opacity: 0,
                        transformOrigin: '50% 50%',
                        transform: 'scale(0, 0)',
                    },

                    '100%': {
                        opacity: 1,
                        transformOrigin: '50% 50%',
                        transform: 'scale(1, 1)'
                    }
                },
                _dynamic: true,
                background: `rgb(${store.red}, ${this.props.green}, ${this.props.blue})`,
                animationName: '@.pulse',
                animationDuration: '1s',
            }
        }
    }

    @action setColor({target}: Event) {
        this._store.red  = Number((target: any).value)
    }
}

function CssChangeInputView(
    _: CssChangeInputProps,
    {store, theme}: { theme: CssChangeInputTheme, store: Store}
) {
    return <div rdi_theme class={theme.css.wrapper}>
        color via css {store.red}: <br id="divider"/><input
            id="range"
            type="range"
            min="0"
            max="255"
            step="5"
            value={store.red}
            onInput={theme.setColor}
        />
    </div>
}

export function CssChangeView() {
    return <div rdi_theme>
        <CssChangeInputView id="first" green={200} blue={0} />
        <br id="divider"/>
        <CssChangeInputView id="second" green={0} blue={200} />
    </div>
}
