<template>
  <div :class="getFieldRowClasses">
    <label
      v-if="hasLabel"
      :for="field.id"
      :class="field.labelClasses"
      class="control-label m-b-xs"
    >
      <span v-html="field.label" />
      <span
        v-if='field.help && field.help.label'
        v-html='field.help.label'
        class="help-block m-n"
      />
    </label>
    <div>
      <component
        v-model="valueInput"
        :key="field.model"
        :is="fieldType"
        :disabled="field.isDisabled"
        :schema="field"
        v-validate="field.validations"
        :data-vv-as="field.label"
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
    >
      <transition name="fade">
        <span
          v-if="hasErrorVeeValidate"
          class="text-xs text-danger"
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
          >
            {{ getModelError(field, error) }}
          </span>
        </template>
      </transition>
      <div
        class="text-xs"
        v-show="field.hint"
        v-html="field.hint"
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
      fieldType: `GoField${this.field.type.charAt(0).toUpperCase() + this.field.type.slice(1)}`,
      isSpecialFieldTypes: ['submit'].includes(this.field.type)
    }
  },
  props: {
    value: {
      required: true
    },
    options: {
      type: Object
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
      const hasError = typeof errorField !== 'undefined' && errorField.length > 0

      return hasError
    },
    hasLabel () {
      return this.field.label && !this.isSpecialFieldTypes
    },
    getFieldRowClasses () {
      const baseClass = 'form-group'

      return this.hasErrors ? `${baseClass} ${this.options.validationErrorClass}` : baseClass
    },
  },
  methods: {
    getModelError (field, error) {
      const dictionary = this.$validator.dictionary

      return dictionary.container[dictionary.locale].messages[error](field.label)
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
