/* @flow */

import {
    DefaultIdCreator
} from 'reactive-di'

const idCreator = new DefaultIdCreator()

export function createId(): string {
    return idCreator.createId()
}
