// @flow

import {mem, action} from 'lom_atom'
import {props} from 'reactive-di'
import {Fetcher} from '../../fetcher'

interface IAutocompleteProps {
    initialValue: string;
    id: string;
}

class DebouncedValue {
    _handler: ?any = null
    _timeout: number

    constructor(timeout: number) {
        this._timeout = timeout
    }

    @mem value<V>(next?: V): V {
        this.destructor()
        throw new Promise((resolve) => {
            this._handler = setTimeout(
                () => resolve(next),
                this._timeout
            )
        })
    }

    destructor() {
        if (this._handler) clearTimeout(this._handler)
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

    @action setValue({target}: Event) {
        this.nameToSearch = (target: Object).value
    }
}

function AutocompleteResultsView(
    _: {},
    {searchResults}: AutocompleteService
) {
    return <ul rdi_theme>
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
    return <div rdi_theme>
        <div id="filter">
            Filter: <input value={nameToSearch} id="value" onInput={setValue}/>
        </div>
        Values: <AutocompleteResultsView id="results" />
    </div>
}
