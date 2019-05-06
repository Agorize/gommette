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
```

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
    :multiple="true"
    :close-on-select="false"
    :clear-on-select="false"
  >
    <template
      slot="selection"
      slot-scope="{ values, search, isOpen }"
    >
      <span class="multiselect__single" v-if="values.length && !isOpen">
        {{ values.length }} options selected
      </span>
    </template>
  </go-multiselect>
</div>
```

```js
const value = []
const options = [
  { name: 'Vue.js', code: 'vu' },
  { name: 'Javascript', code: 'js' },
  { name: 'Open Source', code: 'os' }
]

<div>
  <go-multiselect
    v-model="value"
    tag-placeholder="Add this as new tag"
    placeholder="Search or add a tag"
    label="name"
    track-by="code"
    :options="options"
    :multiple="true"
    :taggable="true"
  >
  </go-multiselect>
</div>
```
</docs>
