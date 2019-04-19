<template>
  <div :class="schema.wrapperClasses">
    <textarea
      class="form-control"
      v-model="valueInput"
      :class="schema.inputClass"
      :id="schema.id"
      :name="schema.inputName"
      :disabled="disabled"
      :required="schema.required"
      :autofocus="schema.autofocus"
      :readonly="schema.readonly"
      :tabindex="schema.tabindex"
      :alt="schema.alt"
      :placeholder="schema.placeholder"
      :cols="schema.cols"
      :rows="schema.rows"
      ref="textarea"
    />
  </div>
</template>

<script>
export default {
  name: 'GoFieldTextarea',
  // API of vee-validate, to transmit vaidations to parent
  $_veeValidate: {
    name () {
      return this.schema.inputName
    },
    // fetch the current value from the innerValue defined in the component data.
    value () {
      return this.valueInput
    }
  },
  data () {
    return {
      // To connect value to v-model
      valueInput: this.value
    }
  },
  props: {
    /**
    * Value of input to have access to v-model in parent
    */
    value: {
      required: true
    },
    /**
    * If is true, input is disabled
    */
    disabled: {
      default: false,
      type: Boolean
    },
    /**
    * Schema with mandatory property for input.
    * {
        "inputName": "comment",
        "label": "Comment",
        "model": "comment",
        "id": "comment",
        "placeholder": "Your comment"
    * }
    */
    schema: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  watch: {
    /**
    * valueInput : Gets called when the user change value of input
    *
    * @event input
    * @type String
    */
    valueInput () {
      this.$emit('input', this.valueInput)
    }
  }
}
</script>

<docs>
```js
  const inputs = [
    {
      fieldInput: {
        "inputName": "comment",
        "label": "Comment",
        "model": "comment",
        "id": "comment",
        "placeholder": "Your comment",
        "rows": "6",
        "cols": "30",
        "help":  {
          "label": "help the label"
        },
      },
      disabled: false,
      value: 'my comment'
    }
  ]

  <div>
    <div
      v-for="(input, key) in inputs"
      :key="key"
    >
      <go-field-textarea
        v-model="input.value"
        :disabled="input.disabled"
        :schema="input.fieldInput"
        :data-vv-as="input.fieldInput.label"
        vee-validate="'required"
      />
      <br />
    </div>
  </div>
```
</docs>
