/* @flow */

import ConfigState from 'reactive-di-todomvc/app/models/ConfigState'
import CommonState from 'reactive-di-todomvc/common/models/CommonState'
import TodoAppState from 'reactive-di-todomvc/todo/models/TodoAppState'
import {assignModel} from 'reactive-di-todomvc/common/helpers'

type AppStateRec = {
    todoAppState?: TodoAppState;
    config?: ConfigState;
    commonState?: CommonState;
}

export default class AppState {
    todoAppState: TodoAppState;
    config: ConfigState;
    commonState: CommonState;

    constructor(rec: AppStateRec = {}) {
        this.todoAppState = assignModel(rec.todoAppState, TodoAppState)
        this.config = assignModel(rec.config, ConfigState)
        this.commonState = assignModel(rec.commonState, CommonState)
    }
}
