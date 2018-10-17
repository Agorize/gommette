import Row from './components/Row'
import Col from './components/Col'

const components = [
  Row,
  Col
]

export default {
  ...components,
  install (Vue, opts = {}) {
    components.forEach(component => {
      Vue.component(component.name, component)
    })
  }
}
