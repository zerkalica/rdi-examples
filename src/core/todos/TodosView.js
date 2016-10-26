// @flow
import Todo from 'rdi-todo/core/models/Todo'
import TodoFilteredCollection from 'rdi-todo/core/models/TodoFilteredCollection'

import TodoView from './todo/TodoView'
import TodosTheme from './TodosTheme'

interface TodosViewProps {
    todos: TodoFilteredCollection;
}

interface TodosViewState {
    theme: TodosTheme;
}

export default function TodosView(
    {todos}: TodosViewProps,
    {theme}: TodosViewState
) {
    return <ul className={theme.wrapper}>
        {todos.items.map((todo: Todo) =>
            <li className={theme.item} key={todo.id}>
                <TodoView todo={todo}/>
            </li>
        )}
    </ul>
}
