// @flow

export type Page<Component, Id> = {
    component: Component;
    id: Id;
    slug: string;
}

export default class PageMap<Component, Extra, Pages: {[id: string]: Component}> {
    _pages: (Page<Component, $Keys<Pages>> & Extra)[]

    constructor(
        pages: Pages,
        extra?: {[$Keys<Pages>]: Extra} = {},
        suffix?: ?string = 'View'
    ) {
        const keys = Object.keys(pages)
        const result = this._pages = []
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i]
            const id = key
            const suffixPos = suffix ? key.length - suffix.length : 0
            const slug = suffix && key.indexOf(suffix) === suffixPos
                ? key.substring(0, suffixPos).toLowerCase()
                : key.toLowerCase()

            const page = {id, slug, component: pages[id], ...extra[id]}
            result.push(page)
        }
    }

    map<V>(cb: (item: Page<Component, $Keys<Pages>> & Extra) => V): V[] {
        return this._pages.map(cb)
    }

    get(slugOrId?: ?string): Page<Component, $Keys<Pages>> & Extra {
        const page = slugOrId
            ? this._pages.find(page => page.slug === slugOrId || page.id === slugOrId)
            : this._pages[0]
        if (!page) throw new Error(`Page ${String(slugOrId)} not found`)

        return page
    }
}
