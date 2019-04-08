<template>
  <div :class="schema.wrapperClasses">
    <component
      :is="schema.tag || 'button'"
      type="submit"
      :id="schema.id"
      :value="schema.value"
      @click.prevent="onClick"
      :name="schema.inputName"
      :disabled="isDisabled"
      :class="schema.inputClass"
    >
      <span>
        {{schema.value}}
      </span>
    </component>
  </div>
</template>

<script>
export default {
  name: 'GoFieldSubmit',
  props: {
    schema: Object,
    isDisabled: {
      default: false,
      type: Boolean
    }
  },
  methods: {
    onClick ($event) {
      this.$emit('submit', $event)
    }
  }
}
</script>

<docs>
```js
  const schemas = [
    {
      wrapperClasses: 'm-b-md',
      id: 'submit',
      value: 'Submit',
      inputName: 'submit',
      inputClass: 'btn btn-primary btn-sm',
      isDisabled: false
    },
    {
      wrapperClasses: 'm-b-xl',
      id: 'submit',
      value: 'Submit',
      inputName: 'submit',
      inputClass: 'btn btn-info btn-sm',
      isDisabled: false
    },
    {
      tag: 'input',
      id: 'submit_form',
      value: 'Submit form',
      inputName: 'submit_form',
      isDisabled: false
    },
  ]

  <div>
    <div>
      <go-field-submit
        v-for="(schema, index) in schemas"
        :key="index"
        :schema="schema"
        :isDisabled="schema.isDisabled"
      />
    </div>
  </div>
```
</docs>
