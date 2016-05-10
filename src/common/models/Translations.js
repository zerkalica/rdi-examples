/* @flow */

import {observable} from 'reactive-di-observable/annotations'

export default class Translations {
    phrases: {[id: string]: string};

    constructor() {
        this.phrases = {}
    }
}
observable(Translations)
