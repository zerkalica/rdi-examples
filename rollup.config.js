import babel from 'rollup-plugin-babel'
import uglify from 'rollup-plugin-uglify'
import resolve from 'rollup-plugin-node-resolve'

import globals from 'rollup-plugin-node-globals'
import replace from 'rollup-plugin-replace'
import commonjs from 'rollup-plugin-commonjs'

import {minify} from 'uglify-es'
import babelrc from 'babelrc-rollup'

import fs from 'fs'

const pkg = JSON.parse(fs.readFileSync('./package.json'))

export default {
    entry: 'src/examples/index.js',
    sourceMap: true,
    plugins: [
        resolve({
            browser: true,
            module: true
        }),
        commonjs({
            include: 'node_modules/**',
            exclude: [
                 'node_modules/preact/**',
                 'node_modules/reactive-di/**',
                 'node_modules/lom_atom/**'
            ]
        }),
        babel(babelrc()),
        globals(),
        replace({
            'process.env.NODE_ENV': JSON.stringify('development')
        }),
        uglify({}, minify)
    ],
    targets: [
        {dest: pkg['iife:main'], format: 'iife', moduleName: pkg.name.replace('-', '_').replace('-', '_')}
    ]
}
