/* @flow */
import rdi from 'reactive-di-todomvc/common/annotations'
import BaseEnv from 'reactive-di-todomvc/common/models/BaseEnv'
import {assignModel} from 'reactive-di-todomvc/common/helpers'

type CommonStateRec = {
    baseEnv?: BaseEnv
}

class CommonState {
    baseEnv: BaseEnv;

    constructor(rec: CommonStateRec) {
        this.baseEnv = assignModel(rec.baseEnv, BaseEnv)
    }
}

export default rdi.model(CommonState)
