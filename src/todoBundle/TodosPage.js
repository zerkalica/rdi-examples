// @flow

import {SourceStatus} from 'reactive-di'

import TodoCollection from 'rdi-todo/todoBundle/common/TodoCollection'
import TodoLayout from 'rdi-todo/common/layout/TodoLayout'
import TodoFilteredCollection from 'rdi-todo/todoBundle/common/TodoFilteredCollection'

import TodosView from './todosMain/TodosView'
import TodosHeaderView from './todosHeader/TodosHeaderView'
import TodosFooterView from './todosFooter/TodosFooterView'

export class TodosPageSavingStatus extends SourceStatus {
    static statuses = [TodoCollection]
}

export default function TodosPage(
    props: {},
    {status, todos}: {
        todos: TodoFilteredCollection;
        status: TodosPageSavingStatus;
    }
) {
    return <TodoLayout status={status}>
        <TodosHeaderView/>
        <TodosView todos={todos} />
        <TodosFooterView/>
    </TodoLayout>
}
