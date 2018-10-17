import Col from './Col.vue'

Col.install = (Vue) => {
  Vue.component(Col.name, Col)
}

export default Col
