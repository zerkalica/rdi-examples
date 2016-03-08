/* @flow */

import BaseEnv from 'reactive-di-todomvc/common/models/BaseEnv'
import BaseQuery from 'reactive-di-todomvc/common/models/BaseQuery'
import Translations from 'reactive-di-todomvc/common/models/Translations'
import {assignModel} from 'reactive-di-todomvc/common/helpers'

type CommonStateRec = {
    baseEnv?: BaseEnv,
    baseQuery?: BaseQuery;
    translations?: Translations;
}

export default class CommonState {
    baseEnv: BaseEnv;
    baseQuery: BaseQuery;
    translations: Translations;

    constructor(rec: CommonStateRec) {
        this.translations = assignModel(rec.translations, Translations)
        this.baseEnv = assignModel(rec.baseEnv, BaseEnv)
        this.baseQuery = assignModel(rec.baseQuery, BaseQuery)
    }
}
