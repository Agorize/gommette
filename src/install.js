import * as components from './components'
import './styles/index.scss'
import * as uiv from 'uiv'
import VeeValidate from 'vee-validate'
import enValidation from 'vee-validate/dist/locale/en'
import frValidation from 'vee-validate/dist/locale/fr'

const install = (Vue, opts = {}) => {
  Vue.use(uiv)
  Vue.use(VeeValidate, {
    locale: opts.defaultLocale,
    dictionary: {
      en: enValidation,
      fr: frValidation,
    }
  })

  Object.keys(components).forEach(key => {
    Vue.component(key, components[key])
  })
}

export {
  install
}
