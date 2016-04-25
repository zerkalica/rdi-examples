/* @flow */
import todoRdi from 'reactive-di-todomvc/todo/rdi/todoRdi'
import commonRdi from 'reactive-di-todomvc/common/rdi/commonRdi'

import type {Annotation} from 'reactive-di/i/coreInterfaces'

const deps: Array<Annotation> = [].concat(
    todoRdi,
    commonRdi
);

export default deps
