<template>
  <div :class="schema.wrapperClasses">
    <input
      class="form-control"
      v-model="valueInput"
      :type="schema.inputType"
      :class="schema.inputClass"
      :id="schema.id"
      :name="schema.inputName"
      :disabled="disabled"
      :required="schema.required"
      :autofocus="schema.autofocus"
      :readonly="schema.readonly"
      :tabindex="schema.tabindex"
      :alt="schema.alt"
      :autocomplete="schema.autocomplete"
      :placeholder="schema.placeholder"
    >
  </div>
</template>

<script>
export default {
  name: 'GoFieldInput',
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
    * { "type": "input",
        "inputType": "text",
        "inputName": "first_name",
        "label": "First Name",
        "model": "first_name", // to connect to model
        "id": "first_name",
        "placeholder": "Your first name",
    * }
    */
    schema: {
      type: Object,
      default: () => {}
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
        "type": "input",
        "inputType": "text",
        "inputName": "first_name",
        "label": "First Name",
        "model": "first_name",
        "id": "first_name",
        "placeholder": "Your first name",
        "help":  {
          "label": "help the label"
        }
      },
      disabled: false,
      valueInput: 'my first name'
    },
    {
      fieldInput: {
        "type": "input",
        "inputType": "text",
        "inputName": "last_name",
        "label": "Last Name",
        "model": "last_name",
        "id": "last_name",
        "placeholder": "Your last name",
        "help":  {
          "label": "help the label"
        }
      },
      disabled: true,
      valueInput: 'my last name'
    }
  ]

  <div>
    <div
      v-for="(input, key) in inputs"
      :key="key"
    >
      <go-field-input
        v-model="input.valueInput"
        :disabled="input.disabled"
        :schema="input.fieldInput"
      />
      <br />
    </div>
  </div>
```
</docs>
