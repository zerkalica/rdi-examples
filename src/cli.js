import '../assets/main.css'

import config from '../conf/.configloaderrc'
import merge from 'node-config-loader/utils/merge'
import ReactDOM from 'react-dom'
import {createElement} from 'react'
import type {ReactiveDi} from 'reactive-di/interfaces/diInterfaces'

import createDi from './app/createDi'
import AppComponent from './app/AppComponent'
import BaseEnv from './common/models/BaseEnv'

const baseEnv = new BaseEnv({
    href: window.location.href
});
const container: ReactiveDi = createDi(baseEnv, merge(config, window.todoMvcSettings || {}));
const props = {
    createRdiUpdater: container.createUpdater
}
const node: Element = document.getElementById('app')

ReactDOM.render(createElement(AppComponent, props), node)
