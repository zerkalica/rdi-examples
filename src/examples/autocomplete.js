// @flow

import {mem, AtomWait, action} from 'lom_atom'
import {props} from 'reactive-di'
import {Fetcher} from '../fetcher'

interface IAutocompleteProps {
    initialValue: string;
    id: string;
}

class DebouncedValue {
    _handler: ?number = null
    _timeout: number

    constructor(timeout: number) {
        this._timeout = timeout
    }

    @mem value<V>(next?: V): V {
        clearTimeout(this._handler)
        this._handler = setTimeout(
            () => mem.cache(this.value(next)),
            this._timeout
        )
        throw new AtomWait()
    }

    destructor() {
        clearTimeout(this._handler)
    }
}

class AutocompleteService {
    @mem nameToSearch: string = ''

    @props set props({initialValue}: IAutocompleteProps) {
        this.nameToSearch = initialValue
    }

    _fetcher: Fetcher

    _debounced = new DebouncedValue(500)

    constructor(fetcher: Fetcher) {
        this._fetcher = fetcher
    }

    @mem get searchResults(): string[] {
        const url = `/autocomplete?q=${this._debounced.value(this.nameToSearch)}`
        return this._fetcher.get(url).json()
    }

    @action setValue(e: Event) {
        const value: string = (e.target: any).value
        this.nameToSearch = value
    }
}

function AutocompleteResultsView(
    _: {},
    {searchResults}: AutocompleteService
) {
    return <ul>
        {searchResults.map((result: string, i: number) =>
            <li key={i} id={`list(${i})`}>
                {result}
            </li>
        )}
    </ul>
}

export function AutocompleteView(
    _: IAutocompleteProps,
    {nameToSearch, setValue}: AutocompleteService
) {
    return <div>
        <div id="filter">
            Filter:
            <input value={nameToSearch} id="value" onInput={setValue}/>
        </div>
        Values:
        <AutocompleteResultsView id="results" />
    </div>
}

export function autocompleteMocks(
    rawStorage: Storage
) {
    const fixture = [
        'John Doe',
        'Vasia Pupkin'
    ]

    return [
        {
            method: 'GET',
            matcher: new RegExp('/api/autocomplete'),
            response(url: string, params: RequestOptions) { // eslint-disable-line
                const names = url.match(new RegExp('/api/autocomplete\\?q=(.+)'))
                const name = names && names.length ? names[1] : ''

                return name
                    ? fixture.filter((userName: string) => userName.indexOf(name) === 0)
                    : fixture
            }
        }
    ]
}
