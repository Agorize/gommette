import fs from 'fs'
import path from 'path'
import vue from 'rollup-plugin-vue'
import resolve from 'rollup-plugin-node-resolve'
import autoprefixer from 'autoprefixer'
import alias from 'rollup-plugin-alias'
import babel from 'rollup-plugin-babel'

import postcss from 'rollup-plugin-postcss'

const base = path.resolve(__dirname, '..')
const src = path.resolve(base, 'src')
const dist = path.resolve(base, 'dist')

// Ensure dist directory exists
if (!fs.existsSync(dist)) {
  fs.mkdirSync(dist)
}

module.exports = {
  input: path.resolve(src, 'index.js'),
  external: ['vue'],
  plugins: [
    vue(),
    resolve({
      external: ['vue'],

    }),
    alias({
      resolve: ['.vue', '.js', '.scss'],
      '@': path.resolve('src'),
      'public': path.resolve('public')
    }),
    postcss({
      extract: true,
      minimize: true,
      sourceMap: true,
      plugins: [autoprefixer()]
    }),
    babel()
  ],
  output: [
    {
      format: 'cjs',
      // add name
      file: path.resolve(dist, `gommette.common.js`),
      sourcemap: true
    },
    {
      format: 'es',
      // add name
      file: path.resolve(dist, `gommette.esm.js`),
      sourcemap: true
    },
    {
      format: 'iife',
      // add name
      name: 'gommette',
      file: path.resolve(dist, `gommette.min.js`)
    }
  ]
}
