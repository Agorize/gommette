import Vue from 'vue'
import VeeValidate from 'vee-validate'

Vue.component('GoFieldInput', () => import('./src/components/GoFields/GoFieldInput.vue'))
Vue.component('GoFieldSubmit', () => import('./src/components/GoFields/GoFieldSubmit.vue'))

Vue.use(VeeValidate)
