// @flow
import './mocks'
import './setup'
import {render} from 'preact'
import AppView from './AppView'

const el = document.getElementById('app')
if (!el) throw new Error('Document has no #app container')

render(<AppView id="demos" lang="ru" />, el)
