/* @flow */
import rdi from 'reactive-di-todomvc/common/annotations'

import todoRdi from 'reactive-di-todomvc/todo/rdi/todoRdi'
import commonRdi from 'reactive-di-todomvc/common/rdi/commonRdi'

import AppState from 'reactive-di-todomvc/app/models/AppState'
import ConfigState from 'reactive-di-todomvc/app/models/ConfigState'

import {RootComponent} from 'reactive-di-react'

import type {AnyAnnotation} from 'reactive-di/i/annotationInterfaces'

const {model, react} = rdi

const deps: Array<AnyAnnotation> = [].concat(
    todoRdi,
    commonRdi,
    model(AppState),
    model(ConfigState),
    react(RootComponent)
);

export default deps
