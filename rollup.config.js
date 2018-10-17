import buble from 'rollup-plugin-buble'
import { uglify } from 'rollup-plugin-uglify'
import node from 'rollup-plugin-node-resolve'
import vue from 'rollup-plugin-vue'

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/index.min.js',
    format: 'umd',
    name: 'agorizeUikit'
  },
  plugins: [
    vue(),
    node(),
    buble({ objectAssign: 'Object.assign' }),
    uglify()
  ]
}
