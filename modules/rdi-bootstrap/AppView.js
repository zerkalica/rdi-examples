// @flow

import {PageNotFoundError} from 'modern-router'

import Pages from './Pages'
import AppParams from './AppParams'

export default function AppView(
    _props: {},
    {params, pages}: {
        params: AppParams;
        pages: Pages;
    }
) {
    const Page: ?Function = pages.pages[params.page || 'TodosPage']
    if (!Page) {
        throw new PageNotFoundError(params.page)
    }

    return <Page/>
}
