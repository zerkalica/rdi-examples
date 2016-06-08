/* @flow */
import {observable} from 'reactive-di-observable/annotations'

@observable({key: 'Translations'})
export default class Translations {
    phrases: {[id: string]: string};

    constructor() {
        this.phrases = {}
    }
}
