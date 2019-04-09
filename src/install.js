import * as components from './components'
import './styles/index.scss'
import * as uiv from 'uiv'

import VeeValidate from 'vee-validate'

const install = (Vue, opts = {}) => {
  Vue.use(VeeValidate)
  Vue.use(uiv)

  Object.keys(components).forEach(key => {
    Vue.component(key, components[key])
  })
}

export {
  install
}
