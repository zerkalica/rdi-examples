// @flow

import injector from './setupReact'

import {mem, force} from 'lom_atom'

import {render} from 'preact'

import {CounterView} from './counter'
import {HelloView} from './hello'
import {TodoAppView, todoMocks} from './todomvc'
import {AutocompleteView, autocompleteMocks} from './autocomplete'

import {ItemView, Locale, mockFetch} from './common'
import {AbstractLocationStore} from './common-todomvc'

mockFetch(localStorage, 500, [
    todoMocks,
    autocompleteMocks
])

class Store {
    static deps = [AbstractLocationStore]
    _locationStore: AbstractLocationStore

    constructor(locationStore: AbstractLocationStore) {
        this._locationStore = locationStore
    }

    pages = ['hello', 'counter', 'error', 'todomvc', 'autocomplete']

    get page(): string {
        return this._locationStore.location('page') || this.pages[0]
    }

    set page(page: string) {
        return this._locationStore.location('page', page, true)
    }

    @mem name = 'vvv'

    @mem state: ?Object = null

    showState = () => {
        this.state = {...injector._state}
    }
}

interface AppProps {
    lang: string;
}

function AppView(
    {lang}: AppProps,
    {store}: {
        store: Store;
    }
) {
    let page
    switch (store.page) {
        case 'hello':
            page = <HelloView name={store.name} />
            break

        case 'counter':
            page = <CounterView />
            break

        case 'autocomplete':
            page = <AutocompleteView initialValue={store.name} />
            break

        case 'todomvc':
            page = <TodoAppView />
            break

        default:
            page = <div>Unknown page</div>
    }

    return <div style={{dislay: 'flex', justifyContent: 'center'}}>
        <div style={{padding: '1em'}}>
            {store.pages.map((link: string) =>
                <button
                    key={link}
                    style={{margin: '0.3em'}}
                    id={link}
                    onClick={() => store.page = link }
                >{link}</button>
            )}
        </div>
        <div style={{border: '1px solid gray', padding: '1em', margin: '0 1em'}}>
            <h1>{store.page}</h1>
            {page}
        </div>
        <button onClick={store.showState}>Show state</button>
        {store.state
            ? <pre>{JSON.stringify(store.state, null, '  ')}</pre>
            : null
        }
        <ItemView>
            <ItemView.Key>APPName:</ItemView.Key>
            <ItemView.Value><input value={store.name} onInput={({target}: Event) => {
                store.name = (target: any).value
            }} /></ItemView.Value>
        </ItemView>
    </div>
}
AppView.deps = [{locale: Locale, store: Store}]

render(<AppView lang="ru" />, document.getElementById('app'))
