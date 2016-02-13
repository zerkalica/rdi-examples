/* @flow */
import rdi from '../../common/annotations'
import {merge} from 'reactive-di'
import BaseEnv from './BaseEnv'

type CommonStateRec = {
    baseEnv?: BaseEnv
}

class CommonState {
    baseEnv: BaseEnv;

    constructor(rec: CommonStateRec) {
        this.baseEnv = rec.baseEnv || new BaseEnv()
    }
}

export default rdi.model(CommonState)
