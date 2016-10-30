// @flow
import {theme} from 'reactive-di/annotations'

@theme
export default class LoaderTheme {
    container: string
    spinner: string

    smallSpinner: string
    smallContainer: string

    __css: mixed
    constructor() {
        this.__css = {
            smallContainer: {
            },
            smallSpinner: {
                color: 'black',
                composes: ['fa', 'fa-spinner'],
                animation: '2s spinner-animation infinite linear'
            },
            container: {
                position: 'relative',
                display: 'block',
                height: '8rem',
                width: '8rem',
                margin: '4rem auto',
                lineHeight: '8rem'
            },
            spinner: {
                composes: ['$smallSpinner'],
                fontSize: '7rem'
            },
            '@keyframes spinner-animation': {
                from: {
                    transform: 'rotate(0deg)'
                },
                to: {
                    transform: 'rotate(360deg)'
                }
            }
        }
    }
}
