// @flow

import {updaters} from 'reactive-di/annotations'
import {UpdaterStatus} from 'reactive-di'


import TodoCollection from 'rdi-todo/core/models/TodoCollection'
import TodoLayout from 'rdi-todo/common/layout/TodoLayout'
import TodoFilteredCollection from 'rdi-todo/core/models/TodoFilteredCollection'

import TodosView from './todos/TodosView'
import TodosHeaderView from './todosHeader/TodosHeaderView'
import TodosFooterView from './todosFooter/TodosFooterView'


@updaters(TodoCollection.Updater)
class TodosUpdaterStatus extends UpdaterStatus {}

export default function TodosPage(
    props: {},
    {status, todos}: {
        todos: TodoFilteredCollection;
        status: TodosUpdaterStatus
    }
) {
    return <TodoLayout status={status}>
        <TodosHeaderView/>
        <TodosView todos={todos} />
        <TodosFooterView/>
    </TodoLayout>
}
