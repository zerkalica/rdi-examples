/* @flow */

import type {
    Translator,
    TokenizedTranslate
} from 'any-translate'

import BaseEnv from 'reactive-di-todomvc/common/models/BaseEnv'
import Translations from 'reactive-di-todomvc/common/models/Translations'

import {
    createTranslate
} from 'any-translate'

import {
    createBabelfishTranslator
} from 'any-translate-adapter-babelfish'

export default function tr(
    baseEnv: BaseEnv,
    translations: Translations
): TokenizedTranslate {
    const translator: Translator = createBabelfishTranslator(
        baseEnv.language,
        translations.phrases
    );

    return createTranslate(translator)
}
