<script>
import Multiselect from 'vue-multiselect'
// export default Multiselect
export default {
  name: 'GoMultiselect',
  extends: Multiselect
}
</script>

<docs>
```js
const value = []
const options = [
  'Select option',
  'options',
  'selected',
  'mulitple',
  'label',
  'searchable',
  'clearOnSelect',
  'touched'
]

<div>
  <go-multiselect
    v-model="value"
    :options="options"
  />
</div>
``
</docs>
