/* @flow */
import type {Tr} from 'reactive-di-todomvc/i/commonInterfaces'
import {factory} from 'reactive-di/annotations'

import BaseEnv from 'reactive-di-todomvc/common/models/BaseEnv'
import Translations from 'reactive-di-todomvc/common/models/Translations'
import Translator from 'babelfish-plus/Translator'

export default function tr(
    baseEnv: BaseEnv,
    translations: Translations
): Tr {
    const translator = new Translator({
        locale: baseEnv.language,
        phrases: translations.phrases
    });

    return translator.t
}
factory(tr)
