<template>
  <div :class="getFieldRowClasses">
    <label
      v-if="hasLabel || field.helpLabel"
      :for="field.id"
      :class="field.labelClasses"
      class="control-label m-b-xs"
      ref="control-label"
    >
      <span
        v-if="hasLabel"
        v-html="field.label"
        ref="label"
      />
      <span
        v-if='field.helpLabel'
        v-html='field.helpLabel'
        class="help-block m-n"
        ref="help-label"
      />
    </label>
    <div>
      <component
        v-if="displayFieldInput"
        v-model="valueInput"
        :key="field.model"
        :is="fieldType"
        :disabled="field.isDisabled"
        :schema="field"
        v-validate="field.validations"
        :data-vv-as="field.label"
        ref="field"
      />
      <div
        v-if="field.buttons"
        class="buttons"
      >
        <button
          v-for="(btn, index) in field.buttons"
          :key="index"
          @click="btn.onClick"
          :class="btn.classes"
          v-text="btn.label"
          :type="btn.type || 'button'"
        />
      </div>
    </div>
    <div
      class="m-t-xs"
      v-show="hasErrors || field.hint"
      ref="errors-container"
    >
      <transition-group name="fade">
        <span
          v-if="hasErrorVeeValidate"
          class="text-xs text-danger"
          ref="errors-vee-validate"
          key="errors-vee-validate"
        >
          {{ errors.first(field.inputName) }}
        </span>
        <template
          v-else-if="hasErrors && !hasErrorVeeValidate"
          mode="out-in"
        >
          <span
            v-for="(error, index) in fieldModelErrors"
            :key="index"
            class="text-xs text-danger"
            ref="errors-db"
          >
            {{ getModelError(field, error) }}
          </span>
        </template>
      </transition-group>
      <div
        class="text-xs"
        v-show="field.hint"
        v-html="field.hint"
        ref="hint"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'GoFormGroup',
  data () {
    return {
      valueInput: this.value,
      displayFieldsErrors: true,
      isSpecialFieldTypes: ['submit'].includes(this.field.type)
    }
  },
  props: {
    value: {
      required: true
    },
    options: {
      type: Object,
      default: () => {
        return {}
      }
    },
    field: {
      type: Object,
      required: true
    },
    errorsModel: {
      type: Array,
      default () {
        return []
      }
    }
  },
  computed: {
    // To get the chance to mock this one
    displayFieldInput () {
      return this.field.model
    },
    fieldType () {
      let type = 'GoFieldInput'

      if (this.field.type && this.field.type.length > 0) {
        type = `GoField${this.field.type.charAt(0).toUpperCase() + this.field.type.slice(1)}`
      }

      return type
    },
    hasErrors () {
      const validateErrors = this.hasErrorVeeValidate

      return validateErrors || (this.displayFieldsErrors && this.fieldModelErrors.length > 0)
    },
    fieldModelErrors () {
      return this.errorsModel
        .filter((error) => error.source.includes(this.field.model))
        .map((error) => error.code)
    },
    hasErrorVeeValidate () {
      const errorField = this.errors.first(this.field.inputName)

      return typeof errorField !== 'undefined' && errorField.length > 0
    },
    hasLabel () {
      return !!this.field.label && !this.isSpecialFieldTypes
    },
    getFieldRowClasses () {
      const baseClass = 'form-group'
      const errorClass = this.options.validationErrorClass || 'has-error'

      return this.hasErrors ? `${baseClass} ${errorClass}` : baseClass
    },
  },
  methods: {
    getModelError (field, error) {
      const dictionary = this.$validator.dictionary
      const label = field.label || ''

      return dictionary.container[dictionary.locale].messages[error](label)
    },
  },
  watch: {
    valueInput () {
      this.$emit('input', this.valueInput)
      this.displayFieldsErrors = false
    },
    fieldModelErrors () {
      this.displayFieldsErrors = true
    },
  }
}
</script>

<style lang="scss">
.fade-enter-active, .fade-leave-active {
  transition: opacity .3s ease;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
