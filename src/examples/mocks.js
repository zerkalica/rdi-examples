// @flow
import apiMocker from '../fetcher/apiMocker'
import fetchMock from 'fetch-mock/es5/client'

import autocompleteMocks from './autocomplete/autocompleteMocks'
import todoMocks from './todomvc/todoMocks'

apiMocker({
    fetchMock,
    mocks: [
        todoMocks,
        autocompleteMocks
    ]
})
