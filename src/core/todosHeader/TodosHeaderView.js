// @flow

import TodosHeaderTheme from './TodosHeaderTheme'
import TodoHeaderLang from './TodoHeaderLang'
import TodoAddView from './todoAdd/TodoAddView'

interface TodosHeaderState {
    theme: TodosHeaderTheme;
    lang: TodoHeaderLang;
}

export default function TodosHeaderView(
    props: {},
    {
        theme,
        lang
    }: TodosHeaderState
) {
    return <header className={theme.wrapper}>
        <h1 className={theme.header}>{lang.todos}</h1>
        <TodoAddView/>
    </header>
}
