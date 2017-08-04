// @flow

import './setup'

import {render} from 'preact'

import {TodoPerfView} from './todomvc'


render(<TodoPerfView/>, document.getElementById('todoapp'))
