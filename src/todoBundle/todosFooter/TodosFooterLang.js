// @flow

import {BaseModel} from 'reactive-di'
import {source} from 'reactive-di/annotations'

export interface TodosFooterLangRec {
}

@source({key: 'TodosFooterLang'})
export default class TodosFooterLang extends BaseModel<TodosFooterLangRec> {
    all: string
    active: string
    completed: string
    clearCompleted: string
    itemLeft: string
    of: string

    static defaults: TodosFooterLangRec = {
        all: 'All',
        active: 'Active',
        completed: 'Completed',
        clearCompleted: 'Clear completed',
        itemLeft: 'item left',
        of: '#{count} of #{total}'
    }

    countOfTotal({count, total}: {count: number, total: number}): string {
        return this.of
            .replace('#{count}', String(count))
            .replace('#{total}', String(total))
    }
}
