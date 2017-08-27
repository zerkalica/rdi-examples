// @flow

import {createCreateElement} from 'reactive-di'
import {h} from '../../adapters/preact'
import atomize from './atomize'

const lomCreateElement = createCreateElement(
    atomize,
    h
)
global['lom_h'] = lomCreateElement
