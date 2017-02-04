// @flow
import Todo from 'rdi-todo/todoBundle/common/Todo'
import TodoFilteredCollection from 'rdi-todo/todoBundle/common/TodoFilteredCollection'

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
                <TodoView item={todo}/>
            </li>
        )}
    </ul>
}
