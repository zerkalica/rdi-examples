/* @flow */
import {model} from 'reactive-di/dist/annotations'
import {component} from 'reactive-di-react'

import todoRdi from 'reactive-di-todomvc/todo/rdi/todoRdi'
import commonRdi from 'reactive-di-todomvc/common/rdi/commonRdi'

import AppState from 'reactive-di-todomvc/app/models/AppState'
import ConfigState from 'reactive-di-todomvc/app/models/ConfigState'

import {RootComponent} from 'reactive-di-react'

import type {Annotation} from 'reactive-di/i/annotationInterfaces'

const deps: Array<Annotation> = [
    model(AppState),
    model(ConfigState),
    component(RootComponent, {
        
    })
].concat(
    todoRdi,
    commonRdi
);

export default deps
