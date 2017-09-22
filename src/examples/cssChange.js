// @flow

import {action, props, mem} from 'lom_atom'
import type {NamesOf} from 'lom_atom'

class Store {
  @mem red = 140
}

function CssChangeTheme(store: Store) {
  return {
    wrapper: {
      background: `rgb(${store.red}, 0, 0)`
    }
  }
}
CssChangeTheme.theme = true

export function CssChangeView(
  _: {},
  {store, theme}: { theme: NamesOf<typeof CssChangeTheme>, store: Store}
) {
  return <div className={theme.wrapper}>
    color via css {store.red}: <input
      type="range"
      min="0"
      max="255"
      value={store.red}
      onInput={({target}) => { store.red = Number(target.value) }}
    />
  </div>
}
