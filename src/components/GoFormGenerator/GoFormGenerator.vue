<template>
  <form
    class="vue-form-generator"
    v-if="schema != null"
  >
    <fieldset v-if="schema.fields">
      <template v-for="(field, index) in schemaFields">
        <go-form-group
          v-if="fieldVisible(field)"
          :key="index"
          :field="field"
          :options="options"
          :errorsModel="errorsModel"
          v-model="value[field.model]"
          ref="fields"
        />
      </template>
    </fieldset>

    <template v-for="(group, index) in groups">
      <fieldset :key="index">
        <legend v-if="group.legend">
          {{ group.legend }}
        </legend>
        <template v-for="(field, index) in group.fields">
          <go-form-group
            v-if="fieldVisible(field)"
            :key="index"
            :field="field"
            :options="options"
            :errorsModel="errorsModel"
            v-model="value[field.model]"
            ref="group-fields"
          />
        </template>
      </fieldset>
    </template>
    <go-field-submit
      :schema="schema.fieldSubmit"
      :isDisabled="hasErrorOnFields($refs)"
      @submit="onSubmit"
    />
  </form>
</template>

<script>
import GoFormGroup from './GoFormGroup.vue'

export default {
  name: 'GoFormGenerator',
  props: {
    errorsModel: {
      type: Array,
      default () {
        return []
      }
    },
    schema: Object,
    value: {
      type: Object,
      required: true
    },
    options: {
      type: Object,
      default () {
        return {
          validationErrorClass: 'has-error',
        }
      }
    }
  },
  computed: {
    schemaFields () {
      return this.schema && this.schema.fields ? this.schema.fields : []
    },
    groups () {
      return this.schema && this.schema.groups ? this.schema.groups : []
    }
  },
  methods: {
    fieldVisible (field) {
      return !field.hidden
    },
    hasErrorOnFields ($refs) {
      const fields = $refs['fields'] || []
      const groupFields = $refs['group-fields'] || []
      const fieldsErrors = [
        ...fields.map(child => child.hasErrors),
        ...groupFields.map(child => child.hasErrors)
      ]
      return fieldsErrors.includes(true)
    },
    onSubmit ($event) {
      if (!this.hasErrorOnFields(this.$refs)) {
        this.$emit('onSubmit', $event)
      }
    }
  },
  watch: {
    value () {
      this.$emit('input', this.value)
    }
  },
  components: {
    GoFormGroup
  }
}
</script>

<docs>
```js
  const forms = [
    {
      model: {
        id: 1,
        last_name: 'John Doe',
        first_name: 'plop',
        password: 'J0hnD03!x4',
        email: 'john.doe@gmail.com',
        status: true
      },
      errorsModel: [
        { 'code': 'required', 'source': '/data/attributes/last_name' },
        { 'code': 'email', 'source': '/data/attributes/email' },
      ],
      schema: {
        fields: [
          {
            type: 'input',
            inputType: 'text',
            inputName: 'first_name',
            label: 'First Name',
            model: 'first_name',
            id: 'first_name',
            placeholder: 'Your first name',
            hint: 'beautiful hint',
            validations: 'required',
            help: {
              label: 'help the label'
            }
          },
          {
            type: 'input',
            inputType: 'text',
            inputName: 'last_name',
            label: 'Last Name',
            model: 'last_name',
            id: 'last_name',
            placeholder: 'Your last name',
            required: true,
            validations: 'required'
          },
          {
            type: 'input',
            inputType: 'email',
            inputName: 'email',
            label: 'Email',
            model: 'email',
            id: 'email',
            placeholder: 'Your email',
            required: true,
            validations: 'required|email'
          },
          {
            type: 'input',
            inputType: 'password',
            inputName: 'password',
            label: 'Password',
            model: 'password',
            id: 'password',
            placeholder: 'Your password',
            required: true,
            validations: 'required'
          }
        ],
        fieldSubmit: {
          type: 'submit',
          tag: 'button',
          inputName: 'submit',
          value: 'Submit',
          id: 'submit',
          inputClass: 'btn btn-sm btn-primary'
        }
      }
    }
  ]

  const onSubmit = ($event) => {
    console.log($event, 'submit event')
  }

  <div>
    <go-form-generator
      v-for="(form, index) in forms"
      v-model="form.model"
      @onSubmit="onSubmit"
      :schema="form.schema"
      :errorsModel="form.errorsModel"
      :key="index"
    />
  </div>
```
</docs>
