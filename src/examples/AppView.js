// @flow

import {action, mem} from 'lom_atom'
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
        const menuButton = {
            margin: 0,
            display: 'block',
            width: '100%',
            textAlign: 'left',
            padding: '5px',
            border: '1px solid #eee',
            background: 'none',
            appearance: 'none',
            lineHeight: '20px',
            textDecoration: 'none',
            cursor: 'pointer',
            '&:hover': {
                textDecoration: 'underline'
            }
        }

        return {
            main: {
                display: 'flex',
                padding: '1em'
            },

            menu: {

            },
            menuItem: {
                marginBottom: '0.3em',
                display: 'block'
            },
            menuButton,
            menuButtonActive: {
                ...menuButton,
                background: '#ddd'
            },

            layout: {
                margin: '0 0 1em 1em'
            },
            apps: {
                padding: '1em',
                margin: '0 0 1em 1em'
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

    displayName: string

    @action setPageSlug(e: Event) {
        const slug = (e.target: any).dataset.slug || null
        if (!slug) mem.cache(this.page = new Error(`Provide data-slug attribute for ${String(this.displayName)}.setPageSlug`))
        this.page = this.pages.get(slug)
    }

    @mem get page() {
        return this.pages.get(this._locationStore.location('page'))
    }

    @mem set page(page: *) {
        this._locationStore.location('page', page.slug)
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
    const {css, page} = store
    return <div rdi_theme class={css.main}>
        <ul id="menu" class={css.menu}>
            {store.pages.map(item =>
                <li
                    id={`item(${item.id})`}
                    key={item.id}
                    class={css.menuItem}
                ><button
                    id={`button(${item.id})`}
                    class={page === item ? css.menuButtonActive : css.menuButton}
                    data-slug={item.slug}
                    onClick={store.setPageSlug}
                >{item.id}</button></li>
            )}
        </ul>
        <div id="apps" class={css.apps}>
            <div id="layout" class={css.layout}>
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
