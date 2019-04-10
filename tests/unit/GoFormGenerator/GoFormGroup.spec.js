import { createLocalVue, shallowMount } from '@vue/test-utils'
import * as AgoUikit from '../../../src'
import { GoFormGroup } from '../../../src'
import { renderCaseHasErrors, renderCaseFieldModelErrors } from './GoFormGroup.render-cases'

const localVue = createLocalVue()

localVue.use(AgoUikit)

describe('GoFormGroup', () => {
  let wrapper
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

    // buttonSubmit = wrapper.find({ref: 'submit'})
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
  // describe('Computed - fieldModelErrors', () => {
  //   renderCaseFieldModelErrors.forEach(renderCase => {
  //     const [describeText, optionsPropsData, expectedValue] = renderCase

  //     describe(describeText, () => {
  //       beforeEach(() => {
  //         localVue.directive('v-validate',  () => null)

  //         wrapper = shallowMount(GoFormGroup, {
  //           localVue,
  //           propsData: optionsPropsData,
  //           stubs: ['go-field-input']
  //         })
  //       })

  //       it(`should return coresponding errors array`, () => {
  //         expect(wrapper.vm.fieldModelErrors).toEqual(expectedValue)
  //       })
  //     })
  //   })
  // })

  // computed hasErrorVeeValidate
  describe('Computed - hasErrorVeeValidate', () => {

  })

  // computed hasLabel
  describe('Computed - hasLabel', () => {

  })

  // computed getFieldRowClasses
  describe('Computed - getFieldRowClasses', () => {

  })

  //////////
  // Methods properties
  //////////

  // watchs getModelError
  describe('Method - getModelError', () => {

  })

  //////////
  // Watch properties
  //////////

  // watchs valueInput
  describe('Watch - valueInput', () => {

  })

  // watchs fieldModelErrors
  describe('Watch - fieldModelErrors', () => {

  })
})
