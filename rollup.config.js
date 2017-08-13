import babel from 'rollup-plugin-babel'
import uglify from 'rollup-plugin-uglify'
import {minify} from 'uglify-es'
import resolve from 'rollup-plugin-node-resolve'

import globals from 'rollup-plugin-node-globals'
import replace from 'rollup-plugin-replace'
import commonjs from 'rollup-plugin-commonjs'
import sourcemaps from 'rollup-plugin-sourcemaps'
import visualizer from 'rollup-plugin-visualizer'

import babelrc from 'babelrc-rollup'

import fs from 'fs'
import path from 'path'

const pkg = JSON.parse(fs.readFileSync('./package.json'))
// console.log(JSON.stringify(babelrc(), 0, '  '))

const baseConfig = {
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
        sourcemaps(),
        babel(babelrc()),
        globals()
        // uglify({}, minify)
    ]
}

const perfPlugins = baseConfig.plugins.concat([
    replace({
        'process.env.NODE_ENV': JSON.stringify('production')
    }),
    // uglify({}, minify)
])

const perfLomRdiConfig = Object.assign({}, baseConfig, {
    entry: 'src/perf/todomvc-lom-rdi/index.js',
    targets: [
        {dest: 'docs/perf/todomvc-lom-rdi/bundle.js', format: 'iife', moduleName: 'todomvc_lom_rdi_perf'}
    ],
    plugins: perfPlugins
})

const perfLomConfig = Object.assign({}, baseConfig, {
    entry: 'src/perf/todomvc-lom/index.js',
    targets: [
        {dest: 'docs/perf/todomvc-lom/bundle.js', format: 'iife', moduleName: 'todomvc_lom_perf'}
    ],
    plugins: perfPlugins
})

const perfPreactConfig = Object.assign({}, baseConfig, {
    entry: 'src/perf/preact/index.js',
    targets: [
        {dest: 'docs/perf/preact/bundle.js', format: 'iife', moduleName: 'preact'}
    ],
    plugins: perfPlugins
})


const examplesConfig = Object.assign({}, baseConfig, {
    entry: 'src/examples/index.js',
    targets: [
        {dest: pkg['iife:main'], format: 'iife', moduleName: pkg.name.replace('-', '_').replace('-', '_')}
    ],
    plugins: baseConfig.plugins.concat([
        replace({
            'process.env.NODE_ENV': JSON.stringify('development')
        }),
        visualizer({filename: path.join(__dirname, 'docs', 'stat.html') })
    ])
})

export default [
    examplesConfig,
    perfLomConfig,
    perfLomRdiConfig,
    perfPreactConfig
]
