// @flow

import {mem} from 'lom_atom'
import {theme} from 'reactive-di'
import {CounterView} from './counter'
import {HelloView} from './hello'
import {TodoAppView} from './todomvc'
import {AutocompleteView} from './autocomplete'
import {CssChangeView} from './cssChange'

import ItemView from './ItemView'
import AbstractLocationStore from '../rdi/AbstractLocationStore'
import PageMap from '../rdi/PageMap'

class Store {
    static deps = [AbstractLocationStore]
    _locationStore: AbstractLocationStore

    pages = new PageMap({
        HelloView,
        CounterView,
        AutocompleteView,
        TodoAppView,
        CssChangeView
    })

    constructor(locationStore: AbstractLocationStore) {
        this._locationStore = locationStore
    }

    @theme get css() {
        return {
            main: {
                display: 'flex',
                padding: '1em'
            },
            '@global': {
                ':focus': {
                    outline: 0
                },
                html: {
                    margin: 0,
                    padding: 0
                },
                body: {
                    font: '14px "Helvetica Neue", Helvetica, Arial, sans-serif',
                    lineHeight: '1.4em',
                    background: '#f5f5f5',
                    color: '#4d4d4d',
                    margin: '0 auto',
                    padding: 0,
                    '-webkit-font-smoothing': 'antialiased',
                    '-moz-osx-font-smoothing': 'grayscale',
                    fontWeight: '300'
                }
            }
        }
    }

    get page() {
        return this.pages.get(this._locationStore.location('page'))
    }

    set page(page: string) {
        return this._locationStore.location('page', page)
    }

    @mem name = 'John'
}

export default function AppView(
    {lang}: {
        lang: string;
    },
    {store}: {
        store: Store;
    }
) {
    const css = store.css
    const page = store.page
    return <div class={css.main}>
        <ul id="menu">
            {store.pages.map(item =>
                <li
                    id={`item(${item.id})`}
                    key={item.id}
                    style={{marginBottom: '0.3em', display: 'block'}}
                ><button
                    id={`button(${item.id})`}
                    style={{
                        width: '150px',
                        background: 'none'
                    }}
                    onClick={() => store.page = item.slug }
                >{item.id}</button></li>
            )}
        </ul>
        <div id="apps">
            <div id="layout" style={{
                border: '1px solid gray',
                padding: '1em',
                margin: '0 0 1em 1em'
            }}>
                <h1 id="title">{page.id}</h1>
                <page.component id={page.id} initialValue={store.name} />
            </div>

            <ItemView id="inital">
                <ItemView.Key id="key">Some value:</ItemView.Key>
                <ItemView.Value id="value">
                    <input
                        id="value-input"
                        value={store.name}
                        onInput={({target}: Event) => { store.name = (target: any).value }}
                    />
                </ItemView.Value>
            </ItemView>
            <div id="emulate-message">
                Type <strong id="code-1">rdi_fetch_error_rate = 0</strong> in console
                for disabling server error emulation. <strong id="code-2">rdi_fetch_error_rate = 100</strong> for 100% errors.
            </div>
        </div>
    </div>
}
