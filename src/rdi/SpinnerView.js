// @flow

import {theme} from 'reactive-di'

class SpinnerTheme {
    @theme get css() {
        const spinner = {
            position: 'relative',
            zIndex: '1000',
            backgroundSize: '28px 28px',
            minWidth: '28px',
            minHeight: '28px'
        }

        return {
            '@keyframes rdi_spinner_wait_move': {
                from: {
                    backgroundPosition: '0 0'
                },
                to: {
                    backgroundPosition: '-28px 0'
                }
            },
            spinner: {
                ...spinner,
                '& *': {
                    opacity: '0.8'
                },
                backgroundImage: `repeating-linear-gradient(45deg, rgba(0,0,0, 0.05), rgba(0,0,0,0.05) 9px, rgba(255,255,255,.015) 10px, rgba(255,255,255,.015) 20px)`,
                animation: 'rdi_spinner_wait_move .25s steps(6) infinite'
            },
            spinnerError: {
                ...spinner,
                backgroundImage: `repeating-linear-gradient(45deg, rgba(255,0,0, 0.1), rgba(255,0,0,0.1) 9px, rgba(255,255,255,.015) 10px, rgba(255,255,255,.015) 20px)`,
            }
        }
    }
}

export default function SpinnerView(
    {children, isError}: {children: any, isError?: boolean},
    {theme: {css}}: {theme: SpinnerTheme}
) {
    return <div class={isError ? css.spinnerError : css.spinner}>{children}</div>
}
