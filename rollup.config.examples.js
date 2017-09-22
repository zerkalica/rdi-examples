import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'

import conf from './rollup.config'

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
