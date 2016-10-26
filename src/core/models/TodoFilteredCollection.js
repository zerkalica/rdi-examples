// @flow

import Todo from './Todo'
import TodoCollection from './TodoCollection'
import TodoFilterParams from './TodoFilterParams'
import type {SelectedGroup} from './TodoFilterParams'

function filterCompleted(item: Todo): boolean {
    return item.isCompleted
}

function filterNotCompleted(item: Todo): boolean {
    return !item.isCompleted
}

export default class TodoFilteredCollection {
    items: Todo[]
    hasCompleted: boolean
    totalCount: number
    itemsCount: number
    selectedGroup: SelectedGroup

    constructor(
        allItems: TodoCollection,
        todoParams: TodoFilterParams
    ) {
        let items: ?Todo[]
        switch (todoParams.selectedGroup) {
            case 'all':
                items = allItems.items
                break
            case 'completed':
                items = allItems.items.filter(filterCompleted)
                break
            case 'active':
                items = allItems.items.filter(filterNotCompleted)
                break
            default:
                throw new Error(`Unhandlered group: ${todoParams.selectedGroup}`)
        }
        this.items = [].concat(items).reverse()
        this.hasCompleted = !!this.items.find(filterCompleted)
        this.totalCount = allItems.length
        this.itemsCount = items.length
        this.selectedGroup = todoParams.selectedGroup
    }
}
