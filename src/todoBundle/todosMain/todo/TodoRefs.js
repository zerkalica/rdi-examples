// @flow
import {Thenable} from 'reactive-di'

export default class TodoRefs {
    editingTitle: Thenable<HTMLElement> = new Thenable()
}
