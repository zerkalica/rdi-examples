/* @flow */

import ConfigState from 'reactive-di-todomvc/app/ConfigState'
import TodoAppState from 'reactive-di-todomvc/todo/models/TodoAppState'

type AppStateRec = {
    todoAppState?: TodoAppState;
    config?: ConfigState;
}

export default class AppState {
    todoAppState: TodoAppState;
    config: ConfigState;

    constructor(rec: AppStateRec = {}) {
        this.todoAppState = rec.todoAppState || new TodoAppState()
        this.config = rec.config || new ConfigState()
    }
}
