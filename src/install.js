import * as components from './components'
import './styles/index.scss'

const install = (Vue, opts = {}) => {
  Object.keys(components).forEach(key => {
    Vue.component(key, components[key])
  })
}

export {
  install
}
