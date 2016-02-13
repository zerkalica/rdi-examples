/* @flow */

import {merge} from 'reactive-di'

import rdi from '../common/annotations'
import ConfigState from './ConfigState'
import TodoAppState from '../todomvc/models/TodoAppState'

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
