// @flow

import {mem, AtomWait} from 'lom_atom'
import {props} from 'reactive-di'

interface IAutocompleteProps {
    initialValue: string;
    id: string;
}

class TimeoutHandler {
    _handler: ?number = null
    constructor(fn: () => void, timeout: number) {
        this._handler = setTimeout(fn, timeout)
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

    @mem _handler: ?TimeoutHandler = null

    @mem get searchResults(): string[] {
        const name = this.nameToSearch
        this._handler = new TimeoutHandler(() => {
            fetch(`/api/autocomplete?q=${name}`)
                .then((r: Response) => r.json())
                .then((data: string[]) => {
                    mem.cache(this.searchResults = data)
                })
                .catch((e: Error) => {
                    mem.cache(this.searchResults = e)
                })
        }, 500)

        throw new AtomWait()
    }

    @mem set searchResults(searchResults: string[] | Error) {}

    setValue = (e: Event) => {
        mem.cache(this.nameToSearch = (e.target: any).value)
    }
}

function AutocompleteResultsView(
    {searchResults}: {
        searchResults: string[];
    }
) {
    return <ul>
        {searchResults.map((result: string, i: number) =>
            <li key={result + i} id={`list(${i})`}>
                {result}
            </li>
        )}
    </ul>
}

export function AutocompleteView(
    {id}: IAutocompleteProps,
    service: AutocompleteService
) {
    const results = service.searchResults
    const name = service.nameToSearch
    return <div id={id}>
        <div id="filter">
            Filter:
            <input value={name} id="value" onInput={service.setValue}/>
        </div>
        Values:
        <AutocompleteResultsView id="results" searchResults={results} />
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
