// @flow
import {theme} from 'reactive-di/annotations'

@theme
export default class LoaderTheme {
    container: string
    spinner: string

    __css: mixed
    constructor() {
        this.__css = {
            container: {
                position: 'relative',
                display: 'block',
                height: '8rem',
                width: '8rem',
                margin: '4rem auto',
                lineHeight: '8rem'
            },
            spinner: {
                color: '#d9edf7',
                composes: ['fa', 'fa-spinner'],
                animation: '2s spinner-animation infinite linear',
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
