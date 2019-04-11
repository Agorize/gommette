import { createLocalVue, shallowMount } from '@vue/test-utils'
import * as AgoUikit from '../../../src'
import { GoFormGenerator } from '../../../src'
import renderCases from './GoFormGenerator.render-cases'

const localVue = createLocalVue()

localVue.use(AgoUikit)

describe('GoFormGenerator', () => {
  let wrapper

  // Install
  it('should be installed', () => {
    expect(localVue.options.components['GoFormGenerator']).toBeTruthy()
  })

  beforeEach(() => {
    wrapper = shallowMount(GoFormGenerator, {
      localVue,
      propsData: {
        value: {
          first_name: 'plop',
        },
        schema: {},
      },
    })
  })

  //////////
  // Computed properties
  //////////

  // computed - schemaFields
  describe('computed - schemaFields', () => {
    it('should return an empty array if the fields are not filled', () => {
      expect(wrapper.vm.schemaFields).toEqual([])
    })

    describe('when fields are filled in schema', () => {
      beforeEach(() => {
        wrapper.setProps({
          schema: {
            fields: [{
                type: 'input',
                inputType: 'text',
                inputName: 'first_name',
                model: 'first_name',
            }],
          }
        })
      })

      it('should return an array of fields according to schemaFields', () => {
        expect(wrapper.vm.schemaFields).toEqual(wrapper.vm.schema.fields)
      })
    })

    describe('when groups are filled in schema', () => {
      beforeEach(() => {
        wrapper.setProps({
          schema: {
            groups: [
              {
                fields: [{
                    type: 'input',
                    inputType: 'text',
                    inputName: 'first_name',
                    model: 'first_name',
                }],
              },
              {
                fields: [{
                    type: 'input',
                    inputType: 'text',
                    inputName: 'last_name',
                    model: 'last_name',
                }],
              }
            ]
          }
        })
      })

      it('should return an empty array', () => {
        expect(wrapper.vm.schemaFields).toEqual([])
      })
    })
  })


  // computed - groups
  describe('computed - groups', () => {
    it('should return an empty array if there is no filled group', () => {
      expect(wrapper.vm.schemaGroups).toEqual([])
    })

    describe('when fields are filled in schema without sub group', () => {
      beforeEach(() => {
        wrapper.setProps({
          schema: {
            fields: [{
                type: 'input',
                inputType: 'text',
                inputName: 'first_name',
                model: 'first_name',
            }],
          }
        })
      })

      it('should return an empty array', () => {
        expect(wrapper.vm.schemaGroups).toEqual([])
      })
    })

    describe('when groups are filled in schema', () => {
      beforeEach(() => {
        wrapper.setProps({
          schema: {
            groups: [
              {
                fields: [{
                    type: 'input',
                    inputType: 'text',
                    inputName: 'first_name',
                    model: 'first_name',
                }],
              },
              {
                fields: [{
                    type: 'input',
                    inputType: 'text',
                    inputName: 'last_name',
                    model: 'last_name',
                }],
              }
            ]
          }
        })
      })

      it('should return an array of groups according to groupsFields', () => {
        expect(wrapper.vm.schemaGroups).toEqual(wrapper.vm.schema.groups)
      })
    })
  })


  //////////
  // Methods properties
  //////////

  // methods - submit
  describe('methods - submit', () => {
    beforeEach(() => {
      wrapper = shallowMount(GoFormGenerator, {
        localVue,
        propsData: {
          value: {
            first_name: 'plop',
          },
          schema: {},
        },
        methods: {
          hasErrorOnFields: () => false
        }
      })
    })

    it('should emit a onSubmit event', async () => {
      await wrapper.vm.submit()
      expect(wrapper.emitted().onSubmit).toBeTruthy()
      expect(wrapper.emitted().onSubmit.length).toBe(1)
    })

    describe('when there are errors on fields', () => {
      beforeEach(() => {
        wrapper = shallowMount(GoFormGenerator, {
          localVue,
          propsData: {
            value: {
              first_name: 'plop',
            },
            schema: {},
          },
          methods: {
            hasErrorOnFields: () => true
          }
        })
      })

      it('should emit a onSubmit event', async () => {
        await wrapper.vm.submit()
        expect(wrapper.emitted().onSubmit).toBeFalsy()
      })
    })
  })

  // methods - fieldVisible
  describe('methods - fieldVisible', () => {
    let field = {}

    it('should field is visible by default', () => {
      expect(wrapper.vm.fieldVisible(field)).toBe(true)
    })

    describe('when hidden property of the field is set to true', () => {
      it('should field is not visible', () => {
        field.hidden = true
        expect(wrapper.vm.fieldVisible(field)).toBe(false)
      })
    })

    describe('when the hidden property of field is setted to false', () => {
      it('should field is visible', () => {
        field.hidden = false
        expect(wrapper.vm.fieldVisible(field)).toBe(true)
      })
    })
  })


  // methods - hasErrorOnFields
  describe('methods - fieldVisible', () => {
    let refs = {}

    it('should return no errors by default', () => {
      expect(wrapper.vm.hasErrorOnFields(refs)).toBe(false)
    })

    describe('when the ref fields are present and have no errors', () => {
      it('should have not error on field', () => {
        const refs = {
          fields: [
            {
              hasErrors: false
            },
            {
              hasErrors: false
            }
          ]
        }

        expect(wrapper.vm.hasErrorOnFields(refs)).toBe(false)
      })
    })

    describe('when the ref field are present and have some errors', () => {
      it('should have no error on the field', () => {
        const refs = {
          fields: [
            {
              hasErrors: true
            },
            {
              hasErrors: false
            }
          ]
        }

        expect(wrapper.vm.hasErrorOnFields(refs)).toBe(true)
      })
    })

    describe('when the ref group are present and have no error', () => {
      it('should have no error on the field', () => {
        const refs = {
          'group-fields': [
            {
              hasErrors: false
            },
            {
              hasErrors: false
            }
          ]
        }

        expect(wrapper.vm.hasErrorOnFields(refs)).toBe(false)
      })
    })

    describe('when the ref groups are present and have errors', () => {
      it('should have errors on the field', () => {
        const refs = {
          'group-fields': [
            {
              hasErrors: true
            },
            {
              hasErrors: false
            }
          ]
        }

        expect(wrapper.vm.hasErrorOnFields(refs)).toBe(true)
      })
    })

    describe('when the ref field and the ref group are present and have errors', () => {
      it('should have errors on fields', () => {
        const refs = {
          'group-fields': [
            {
              hasErrors: true
            },
            {
              hasErrors: false
            }
          ],
          fields: [
            {
              hasErrors: true
            },
            {
              hasErrors: false
            }
          ]
        }

        expect(wrapper.vm.hasErrorOnFields(refs)).toBe(true)
      })
    })
  })


  //////////
  // Watch properties
  //////////

  // watch - value
  describe('Watch - value', () => {
    it('should emit the input value when change value', async () => {
      const expectedValue = 'first name'
      const newValue = 'name'

      await wrapper.setProps({ value: expectedValue })
      expect(wrapper.emitted().input).toBeTruthy()
      expect(wrapper.emitted().input.length).toBe(1)
      expect(wrapper.emitted().input[0]).toEqual([expectedValue])

      await wrapper.setProps({ value: newValue })

      expect(wrapper.emitted().input).toBeTruthy()
      expect(wrapper.emitted().input.length).toBe(2)
      expect(wrapper.emitted().input[1]).toEqual([newValue])
    })
  })
})
