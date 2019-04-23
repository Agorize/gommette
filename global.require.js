import Vue from 'vue'
import * as uiv from 'uiv'
import VeeValidate from 'vee-validate'
import enValidation from 'vee-validate/dist/locale/en'
import frValidation from 'vee-validate/dist/locale/fr'

Vue.component('GoFieldInput', () => import('./src/components/GoFields/GoFieldInput.vue'))
Vue.component('GoFieldSubmit', () => import('./src/components/GoFields/GoFieldSubmit.vue'))

Vue.use(uiv)
Vue.use(VeeValidate, {
  locale: 'en',
  dictionary: {
    en: enValidation,
    fr: frValidation
  }
})
