/* @flow */

import {merge} from 'reactive-di'

import rdi from 'reactive-di-todomvc/common/annotations'
import ConfigState from 'reactive-di-todomvc/app/ConfigState'
import TodoAppState from 'reactive-di-todomvc/todo/models/TodoAppState'

type AppStateRec = {
    todoAppState?: TodoAppState;
    config?: ConfigState;
}

class AppState {
    todoAppState: TodoAppState;
    config: ConfigState;

    constructor(rec: AppStateRec = {}) {
        this.todoAppState = rec.todoAppState || new TodoAppState()
        this.config = rec.config || new ConfigState()
    }
}

export default rdi.model(AppState)
