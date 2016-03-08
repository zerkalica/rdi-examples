/* @flow */

import BaseEnv from 'reactive-di-todomvc/common/models/BaseEnv'
import Translations from 'reactive-di-todomvc/common/models/Translations'
import Translator from 'babelfish-plus/Translator'

type Tr = (message: string, params: ?Map<string, string|Object|Function>)
    => Array<string|Object|Function>|string;

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
