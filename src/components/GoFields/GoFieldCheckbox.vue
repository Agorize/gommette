<template>
  <div :class="wrapperClasses">
    <label
      :for="schema.inputName"
      :class="schema.labelClasses"
      ref="checkbox"
    >
      <input
        @change="onChange"
        class="boolean optional"
        :class="schema.inputClass"
        type="checkbox"
        :name="schema.inputName"
        :id="schema.id"
        v-model="valueInput"
        :disabled="disabled"
        :required="schema.required"
        :autofocus="schema.autofocus"
        :readonly="schema.readonly"
        :tabindex="schema.tabindex"
        :alt="schema.alt"
        :autocomplete="schema.autocomplete"
        :placeholder="schema.placeholder"
      >
      <span
        v-if="!!schema.label"
        v-html="schema.label"
        ref="label"
      />
    </label>
  </div>
</template>

<script>
export default {
  name: 'GoFieldCheckbox',
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
        "inputName": "checkbox_rules",
        "label": "check this",
        "model": "checkbox_rules",
        "id": "checkbox_rules"
    * }
    */
    schema: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  computed: {
    wrapperClasses () {
      const defaultClass = this.schema.wrapperClasses ? ' checkbox' : 'checkbox'
      const disabledClass = this.disabled ? ' disabled' : ''

      return (this.schema.wrapperClasses || '') + defaultClass + disabledClass
    }
  },
  methods: {
    onChange () {
      this.$emit('change', this.valueInput)
    }
  },
  watch: {
    /**
    * value :  when user set new value props, set valueInput with new value
    *
    */
    value () {
      this.valueInput = this.value
    },
    /**
    * valueInput : Gets called when the user change value of input
    *
    * @event input
    * @type String
    */
    valueInput () {
      this.$emit('input', this.valueInput)
    }
  },
}
</script>

<docs>
## Basic usage
```js
const input = {
  fieldInput: {
    "inputName": "checkbox_rules",
    "label": "check this",
    "model": "checkbox_rules",
    "id": "checkbox_rules"
  },
  disabled: false,
  value: false
}

<div>
  <go-field-checkbox
    v-model="input.value"
    :disabled="input.disabled"
    :schema="input.fieldInput"
    :data-vv-as="input.fieldInput.label"
    vee-validate="'required'"
  />
</div>
```

## Checked by default
```js
const input = {
  fieldInput: {
    "inputName": "checkbox_rules_1",
    "label": "check this",
    "model": "checkbox_rules_1",
    "id": "checkbox_rules_1"
  },
  disabled: false,
  value: true
}

<div>
  <go-field-checkbox
    v-model="input.value"
    :disabled="input.disabled"
    :schema="input.fieldInput"
    :data-vv-as="input.fieldInput.label"
    vee-validate="'required'"
  />
</div>
```

## Update event
```js
const input = {
  fieldInput: {
    "inputName": "checkbox_rules_2",
    "label": "check this",
    "model": "checkbox_rules_2",
    "id": "checkbox_rules_2"
  },
  disabled: false,
  value: false
}

const onChange = (value) => {
  alert(`ON CHANGE! ${value}`)
}

<div>
  <go-field-checkbox
    v-model="input.value"
    @change="onChange"
    :disabled="input.disabled"
    :schema="input.fieldInput"
    :data-vv-as="input.fieldInput.label"
    vee-validate="'required'"
  />
</div>
```

## Disabled
```js
const input = {
  fieldInput: {
    "inputName": "checkbox_rules_3",
    "label": "check this",
    "model": "checkbox_rules_3",
    "id": "checkbox_rules_3"
  },
  disabled: true,
  value: false
}

<div>
  <go-field-checkbox
    v-model="input.value"
    :disabled="input.disabled"
    :schema="input.fieldInput"
    :data-vv-as="input.fieldInput.label"
    vee-validate="'required'"
  />
</div>
```


## Disabled and checked
```js
const input = {
  fieldInput: {
    "inputName": "checkbox_rules_4",
    "label": "check this",
    "model": "checkbox_rules_4",
    "id": "checkbox_rules_4"
  },
  disabled: true,
  value: true
}

<div>
  <go-field-checkbox
    v-model="input.value"
    :disabled="input.disabled"
    :schema="input.fieldInput"
    :data-vv-as="input.fieldInput.label"
    vee-validate="'required'"
  />
</div>
```
</docs>
