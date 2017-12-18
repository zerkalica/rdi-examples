// @flow

export default function autocompleteMocks(
    rawStorage: Storage
) {
    const fixture = [
        'John Doe',
        'Vasia Pupkin'
    ]

    return [
        {
            method: 'GET',
            matcher: new RegExp('/api/autocomplete\\?q=(.+)'),
            response(url: string, params: RequestOptions, name: string) { // eslint-disable-line
                return name
                    ? fixture.filter((userName: string) => userName.indexOf(name) === 0)
                    : fixture
            }
        }
    ]
}
