import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'

import confs from './rollup.config'

const conf = confs[0]

export default Object.assign(
    {},
    conf,
    {
        plugins: conf.plugins.concat([
            serve({
                open: true,
                historyApiFallback: true,
                contentBase: 'docs'
            }),

            livereload({
                watch: ['docs', 'src']
            })

        ])
    }
)
