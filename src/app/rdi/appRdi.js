/* @flow */
import {model} from 'reactive-di/dist/annotations'

import todoRdi from 'reactive-di-todomvc/todo/rdi/todoRdi'
import commonRdi from 'reactive-di-todomvc/common/rdi/commonRdi'

import AppState from 'reactive-di-todomvc/app/models/AppState'
import ConfigState from 'reactive-di-todomvc/app/models/ConfigState'

import type {Annotation} from 'reactive-di/i/annotationInterfaces'

const deps: Array<Annotation> = [
    model(AppState),
    model(ConfigState)
].concat(
    todoRdi,
    commonRdi
);

export default deps
