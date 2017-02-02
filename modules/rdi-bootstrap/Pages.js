// @flow
import {source} from 'reactive-di/annotations'

@source({key: 'Pages', instance: true})
export default class Pages {
    pages: {[id: string]: Function}

    constructor(pages: {[id: string]: Function}) {
        this.pages = pages
    }
}
