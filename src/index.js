import Row from './components/row'
import Col from './components/col'
import Button from './components/button'

const components = [
  Row,
  Col,
  Button
]

export default {
  ...components,
  install (Vue, opts = {}) {
    components.forEach(component => {
      Vue.component(component.name, component)
    })
  }
}
