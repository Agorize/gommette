import Row from './components/Row/Row.vue'
import Col from './components/Col/Col.vue'

const components = [
  Row,
  Col
].map(component => {
  component.install = (Vue) => {
    Vue.component(component.name, component)
  }
  return component
})

export default {
  ...components,
  install (Vue, opts = {}) {
    components.forEach(component => {
      Vue.component(component.name, component)
    })
  }
}
