import { createLocalVue, shallowMount } from '@vue/test-utils'
import * as AgoUikit from '../../../src'
import { GoFormGroup, GoFieldInput } from '../../../src'
import { renderCaseHasErrors, renderCaseFieldModelErrors } from './GoFormGroup.render-cases'

const localVue = createLocalVue()

localVue.use(AgoUikit)

describe('GoFormGroup', () => {
  let wrapper
  // Must no fill model, because it broken test with vee-validate
  const baseEntryField = {
    inputType: 'text',
    inputName: 'last_name',
    placeholder: 'Your last name',
    required: true,
    validations: 'required'
  }

  beforeEach(() => {
    wrapper = shallowMount(GoFormGroup, {
      localVue,
      propsData: {
        value: 'my name',
        field: baseEntryField
      },
    })
  })

  // Install
  it('should be installed', () => {
    expect(localVue.options.components['GoFormGroup']).toBeTruthy()
  })

  //////////
  // Data properties
  //////////

  // data isSpecialFieldTypes
  describe('Data - isSpecialFieldTypes', () => {
    it('should return if is special input field', () => {
      expect(wrapper.vm.isSpecialFieldTypes).toBe(false)
    })

    describe('when type is fill', () => {
      beforeEach(() => {
        wrapper = shallowMount(GoFormGroup, {
          localVue,
          propsData: {
            value: 'my name',
            field: {
              ...baseEntryField,
              type: 'input'
            }
          },
        })
      })

      it('should return if is special input field', () => {
        expect(wrapper.vm.isSpecialFieldTypes).toBe(false)
      })
    })

    describe('when type fill is a special field', () => {
      beforeEach(() => {
        wrapper = shallowMount(GoFormGroup, {
          localVue,
          propsData: {
            value: 'my name',
            field: {
              ...baseEntryField,
              type: 'submit'
            }
          },
        })
      })

      it('should return if is special input field', () => {
        expect(wrapper.vm.isSpecialFieldTypes).toBe(true)
      })
    })
  })


  //////////
  // Computed properties
  //////////

  // data fieldType
  describe('Computed - fieldType', () => {
    it('should return default field type', () => {
      expect(wrapper.vm.fieldType).toBe('GoFieldInput')
    })

    describe('when type fill is "input"', () => {
      beforeEach(() => {
        wrapper = shallowMount(GoFormGroup, {
          localVue,
          propsData: {
            value: 'my name',
            field: {
              ...baseEntryField,
              type: 'input'
            }
          },
        })
      })

      it('should return if is special input field', () => {
        expect(wrapper.vm.fieldType).toBe('GoFieldInput')
      })
    })

    describe('when type fill is "submit"', () => {
      beforeEach(() => {
        wrapper = shallowMount(GoFormGroup, {
          localVue,
          propsData: {
            value: 'my name',
            field: {
              ...baseEntryField,
              type: 'submit'
            }
          },
        })
      })

      it('should return if is special input field', () => {
        expect(wrapper.vm.fieldType).toBe('GoFieldSubmit')
      })
    })
  })

  // computed hasErrors
  describe('Computed - hasErrors', () => {
      // Render testing
    renderCaseHasErrors.forEach(renderCase => {
      const [describeText, options, expectedValue] = renderCase

      describe(describeText, () => {
        beforeEach(() => {
          wrapper = shallowMount(GoFormGroup, {
            localVue,
            ...options
          })
        })

        it(`should have ${expectedValue} errors`, () => {
          expect(wrapper.vm.hasErrors).toBe(expectedValue)
        })
      })
    })
  })

  // computed fieldModelErrors
  describe('Computed - fieldModelErrors', () => {
    renderCaseFieldModelErrors.forEach(renderCase => {
      const [describeText, optionsPropsData, expectedValue] = renderCase

      describe(describeText, () => {
        beforeEach(() => {
          localVue.directive('v-validate',  () => null)

          wrapper = shallowMount(GoFormGroup, {
            localVue,
            propsData: optionsPropsData,
            computed: {
              displayFieldInput: () => false
            }
          })
        })

        it(`should return coresponding errors array`, () => {
          expect(wrapper.vm.fieldModelErrors).toEqual(expectedValue)
        })
      })
    })
  })

  // computed hasErrorVeeValidate
  describe('Computed - hasErrorVeeValidate', () => {
    it('should return no error vee-validate', () => {
      expect(wrapper.vm.hasErrorVeeValidate).toBe(false)
    })

    describe('when errors are specified', () => {
      beforeEach(() => {
        wrapper.vm.$validator.errors.add({
          field: wrapper.vm.field.inputName,
          msg: 'Wrong Credentials'
        })
      })

      it('should return errors vee-validate', () => {
        expect(wrapper.vm.hasErrorVeeValidate).toBe(true)
      })
    })

    describe('when specified error are wrong field', () => {
      beforeEach(() => {
        wrapper.vm.$validator.errors.add({
          field: 'wrong_field',
          msg: 'Wrong Credentials'
        })
      })

      it('should return errors vee-validate', () => {
        expect(wrapper.vm.hasErrorVeeValidate).toBe(false)
      })
    })
  })

  // computed hasLabel
  describe('Computed - hasLabel', () => {
    it('should have no label by default', () => {
      expect(wrapper.vm.hasLabel).toBe(false)
    })

    describe('when field has label and type is not specified', () => {
      beforeEach(() => {
        wrapper = shallowMount(GoFormGroup, {
          localVue,
          propsData: {
            value: 'my name',
            field: {
              ...baseEntryField,
              label: 'my label'
            }
          },
        })
      })

      it('should have label', () => {
        expect(wrapper.vm.hasLabel).toBe(true)
      })
    })

    describe('when field has label and type is specified', () => {
      beforeEach(() => {
        wrapper = shallowMount(GoFormGroup, {
          localVue,
          propsData: {
            value: 'my name',
            field: {
              ...baseEntryField,
              type: 'input',
              label: 'my label'
            }
          },
        })
      })

      it('should have label', () => {
        expect(wrapper.vm.hasLabel).toBe(true)
      })
    })

    describe('when field has label and type is "submit"', () => {
      beforeEach(() => {
        wrapper = shallowMount(GoFormGroup, {
          localVue,
          propsData: {
            value: 'my name',
            field: {
              ...baseEntryField,
              type: 'submit',
              label: 'my label'
            }
          },
        })
      })

      it('should have not label', () => {
        expect(wrapper.vm.hasLabel).toBe(false)
      })
    })
  })

  // computed getFieldRowClasses
  describe('Computed - getFieldRowClasses', () => {
    beforeEach(() => {
      wrapper = shallowMount(GoFormGroup, {
        localVue,
        propsData: {
          value: 'my name',
          field: {
            ...baseEntryField,
          },
        },
        computed: {
          hasErrors: () => false
        }
      })
    })

    it('should return base class', () => {
      expect(wrapper.vm.getFieldRowClasses).toBe('form-group')
    })

    describe('when there are errors', () => {
      beforeEach(() => {
        wrapper = shallowMount(GoFormGroup, {
          localVue,
          propsData: {
            value: 'my name',
            field: {
              ...baseEntryField,
            },
          },
          computed: {
            hasErrors: () => true
          }
        })
      })

      it('should return base class with default error class', () => {
        expect(wrapper.vm.getFieldRowClasses).toBe('form-group has-error')
      })

      describe('when validation error class is specified in options props', () => {
        const expectedErrorClass = 'error-class'

        beforeEach(() => {
          wrapper = shallowMount(GoFormGroup, {
            localVue,
            propsData: {
              value: 'my name',
              field: {
                ...baseEntryField,
              },
              options: {
                validationErrorClass: expectedErrorClass
              },
            },
            computed: {
              hasErrors: () => true
            }
          })
        })

        it('should return base class with default error class', () => {
          expect(wrapper.vm.getFieldRowClasses).toBe(`form-group ${expectedErrorClass}`)
        })
      })
    })
  })

  //////////
  // Methods properties
  //////////

  // watchs getModelError
  describe('Method - getModelError', () => {
    let dictionnary

    beforeEach(() => {
      dictionnary = wrapper.vm.$validator.dictionary.container['en']
    })

    it('should return default message', () => {
      const expectedValue = dictionnary.messages['required']('')

      expect(wrapper.vm.getModelError(baseEntryField, 'required')).toBe(expectedValue)
    })

    describe('when field label is specified', () => {
      const customBaseEntryField = {
        ...baseEntryField,
        label: 'first name'
      }

      it('should return default message', () => {
        const expectedValue = dictionnary.messages['required']('first name')

        expect(wrapper.vm.getModelError(customBaseEntryField, 'required')).toBe(expectedValue)
      })
    })
  })

  //////////
  // Watch properties
  //////////

  // watchs valueInput
  describe('Watch - valueInput', () => {
    it('should emit input value when change value', async () => {
      const expectedValue = 'first name'
      const newValue = 'name'

      await wrapper.setData({ valueInput: expectedValue })
      expect(wrapper.emitted().input).toBeTruthy()
      expect(wrapper.emitted().input.length).toBe(1)
      expect(wrapper.emitted().input[0]).toEqual([expectedValue])

      await wrapper.setData({ valueInput: newValue })

      expect(wrapper.emitted().input).toBeTruthy()
      expect(wrapper.emitted().input.length).toBe(2)
      expect(wrapper.emitted().input[1]).toEqual([newValue])
    })

    it('should change displayFieldsErrors data to false', async () => {
      expect(wrapper.vm.displayFieldsErrors).toBe(true)
      await wrapper.setData({ valueInput: 'change' })
      expect(wrapper.vm.displayFieldsErrors).toBe(false)
      await wrapper.setData({ valueInput: 'change 2' })
      expect(wrapper.vm.displayFieldsErrors).toBe(false)
    })
  })

  // watchs fieldModelErrors
  describe('Watch - fieldModelErrors', () => {
    it('should change displayFieldsErrors data to true when change model errors', async () => {
      await wrapper.setData({ displayFieldsErrors: false })
      expect(wrapper.vm.displayFieldsErrors).toBe(false)
      await wrapper.setProps({ errorsModel: [
        { 'code': 'required', 'source': '/data/attributes/last_name' },
        { 'code': 'email', 'source': '/data/attributes/email' },
      ]})
      expect(wrapper.vm.displayFieldsErrors).toBe(true)
    })
  })
})
