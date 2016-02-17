/* @flow */

import '../assets/main.css'

import merge from 'node-config-loader/utils/merge'
import ReactDOM from 'react-dom'
import {createElement} from 'react'
import {createBindReactState, RootComponent} from 'reactive-di-react'

import config from '../conf/.configloaderrc'
import createDi from './app/createDi'
import createPageFacet from './common/facets/createPageFacet'
import pageMap from './app/pageMap'
import BaseEnv from './common/models/BaseEnv'

const baseEnv = new BaseEnv({
    href: window.location.href
});

const node: Element = document.getElementById('app');

const di = createDi(baseEnv, merge(config, window.todoMvcSettings || {}));
const pageFacet = createPageFacet(pageMap)
const page = di({
    page: pageFacet
})
const bindReactState = createBindReactState(di)

ReactDOM.render(createElement(RootComponent, {
    page,
    bindReactState
}), node)
