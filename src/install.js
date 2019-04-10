import * as components from './components'
import './styles/index.scss'

import VeeValidate from 'vee-validate'

const install = (Vue, opts = {}) => {
  Vue.use(VeeValidate)

  Object.keys(components).forEach(key => {
    Vue.component(key, components[key])
  })
}

export {
  install
}
