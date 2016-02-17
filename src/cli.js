/* @flow */

import 'reactive-di-todomvc/assets/main.css'

import type {GetDep} from 'reactive-di/i/diInterfaces'
import type {RootComponentProps} from 'reactive-di-react/i/interfaces'

import merge from 'node-config-loader/utils/merge'
import ReactDOM from 'react-dom'
import {createElement} from 'react'
import {RootComponent} from 'reactive-di-react'
import config from 'reactive-di-todomvc/../conf/.configloaderrc'
import createDi from 'reactive-di-todomvc/app/createDi'
import BaseEnv from 'reactive-di-todomvc/common/models/BaseEnv'
import createReactProps from 'reactive-di-todomvc/app/createReactProps'

const baseEnv = new BaseEnv({
    href: window.location.href
});
const runtimeConfig = window.todoMvcSettings || {};
const di: GetDep = createDi(baseEnv, merge(config, runtimeConfig));

const props: RootComponentProps = createReactProps(di);
const node: Element = document.getElementById('app');

ReactDOM.render(createElement(RootComponent, props), node)
