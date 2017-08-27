// @flow

import './setup'

import {render} from '../../adapters/preact'

import {TodoPerfView} from './todomvc'


render(<TodoPerfView/>, document.getElementById('todoapp'))
