import fs from 'fs'
import path from 'path'
import vue from 'rollup-plugin-vue'
import resolve from 'rollup-plugin-node-resolve'
import postcss from 'postcss'
import autoprefixer from 'autoprefixer'
import alias from 'rollup-plugin-alias'
import scss from 'rollup-plugin-scss'
import babel from 'rollup-plugin-babel'
import babelrc from 'babelrc-rollup'

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
      external: ['vue']
    }),
    alias({
      resolve: ['.vue', '.js', '.scss'],
      '@': path.resolve('src'),
      'public': path.resolve('public')
    }),
    // node(),
    scss({
      output: 'dist/gommette.css',
      processor: css => postcss([autoprefixer])
        .process(css)
        .then(result => result.css)
    }),
    babel(babelrc())
  ],
  output: [
    {
      format: 'cjs',
      file: path.resolve(dist, `gommette.common.js`),
      sourcemap: true
    },
    {
      format: 'es',
      file: path.resolve(dist, `gommette.esm.js`),
      sourcemap: true
    },
    {
      format: 'iife',
      name: 'gommette',
      file: path.resolve(dist, `gommette.min.js`)
    }
  ]
}
