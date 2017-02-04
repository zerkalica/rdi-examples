// @flow

import {EventHelper, KEYCODE} from 'rdi-helpers'
import {ErrorableElement} from 'rdi-ui-common'

import TodoErrors from 'rdi-todo/todoBundle/common/TodoErrors'

import TodoAddTheme from './TodoAddTheme'
import TodoAddLang from './TodoAddLang'
import TodoAddService from './TodoAddService'
import TodoAddValues from './TodoAddValues'

interface TodoAddState {
    theme: TodoAddTheme;
    helper: EventHelper;
    lang: TodoAddLang;
    service: TodoAddService;
    values: TodoAddValues;
    errors: TodoErrors;
}

export default function TodoAddView(
    props: {},
    {
        theme,
        values,
        errors,
        lang,
        helper,
        service
    }: TodoAddState
) {
    return <div className={theme.group}>
        <button
            onClick={service.toggleAll}
            className={theme.toggleAll}
        ><span className={theme.togleAllIcon}/></button>
        <ErrorableElement
            errorSide="bottom"
            error={errors.title}
        >
            <input
                id="addTodoTitle"
                className={theme.ctl}
                type="text"
                placeholder={lang.todoPlaceholder}
                autoFocus
                value={values.title}
                onChange={helper.change(service.setTitle)}
                onKeyDown={helper.keyMap([
                    [KEYCODE.ENTER, service.commitAdding],
                    [KEYCODE.ESC, service.cancelAdding]
                ])}
            />
        </ErrorableElement>
        <button
            type="submit"
            className={theme.submit}
            onClick={helper.click(service.commitAdding)}
        ><span className={theme.addIcon}/></button>
    </div>
}
