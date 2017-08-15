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
    ].concat(process.env.UGLIFY === '1' ? [uglify({}, minify)] : [])
}

const perfPlugins = baseConfig.plugins.concat([
    replace({
        'process.env.NODE_ENV': JSON.stringify('production')
    }),
    // uglify({}, minify)
])

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

function toConfig(name) {
    return Object.assign({}, baseConfig, {
        entry: `src/perf/${name}/index.js`,
        targets: [
            {dest: `docs/perf/${name}/bundle.js`, format: 'iife', moduleName: name.replace(/\-/g, '_')}
        ],
        plugins: perfPlugins
    })
}

export default [
    examplesConfig,
].concat(['preact', 'preact-mobx', 'preact-lom', 'preact-lom-rdi'].map(toConfig))
