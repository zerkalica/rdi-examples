// @flow

import {BaseModel} from 'reactive-di'
import {source} from 'reactive-di/annotations'

export interface TodosFooterLangRec {
}

@source({key: 'TodosFooterLang'})
export default class TodosFooterLang extends BaseModel {
    all = 'All'
    active = 'Active'
    completed = 'Completed'
    clearCompleted = 'Clear completed'
    itemLeft = 'item left'
    of = '#{count} of #{total}'

    countOfTotal({count, total}: {count: number, total: number}): string {
        return this.of
            .replace('#{count}', String(count))
            .replace('#{total}', String(total))
    }
}
