import { createLocalVue, shallowMount } from '@vue/test-utils'
import * as AgoUikit from '../../../src'
import { GoFieldSubmit } from '../../../src'

const localVue = createLocalVue()

localVue.use(AgoUikit)

describe('GoFieldSubmit', () => {
  let wrapper
  let buttonSubmit

  beforeEach(() => {
    wrapper = shallowMount(GoFieldSubmit, {
      localVue,
    })

    buttonSubmit = wrapper.find({ref: 'submit'})
  })

  // Install
  it('should be installed', () => {
    expect(localVue.options.components['GoFieldSubmit']).toBeTruthy()
  })

  it('should be default options component', () => {
    expect(buttonSubmit.is('button')).toBe(true)

    expect(buttonSubmit.attributes('type')).toBe('submit')
  })

  it('should have empty attributes which are not filled', () => {
    expect(buttonSubmit.attributes('value')).toBe(undefined)
    expect(buttonSubmit.attributes('name')).toBe(undefined)
    expect(buttonSubmit.attributes('disabled')).toBe(undefined)
    expect(buttonSubmit.attributes('class')).toBe(undefined)
  })

  it('should emit submit event when there is a click event on submit button', () => {
    buttonSubmit.trigger('click')

    expect(wrapper.emitted().submit).toBeTruthy()
    expect(wrapper.emitted().submit.length).toBe(1)
    expect(wrapper.emitted().submit[0][0].type).toBe('click')
  })

  it('should emit submit event when there is a enter key event on submit button', () => {
    buttonSubmit.trigger('keyup.enter')

    expect(wrapper.emitted().submit).toBeTruthy()
    expect(wrapper.emitted().submit.length).toBe(1)
    expect(wrapper.emitted().submit[0][0].type).toBe('keyup')
    expect(wrapper.emitted().submit[0][0].keyCode).toBe(13)
  })

  describe('when schema is filled', () => {
    const schema = {
      tag: 'input',
      id: 'submit',
      value: 'Submit',
      inputName: 'submit',
      inputClass: 'btn btn-primary btn-sm',
    }
    beforeEach(() => {
      wrapper = shallowMount(GoFieldSubmit, {
        propsData: {
          schema,
          isDisabled: true
        },
        localVue,
      })

      buttonSubmit = wrapper.find({ref: 'submit'})
    })

    it('should have tag component which are specified in schema props', () => {
      expect(buttonSubmit.is('input')).toBe(true)
    })

    it('should have attributes which are specified in props', () => {
      expect(buttonSubmit.attributes('value')).toBe(schema.value)
      expect(buttonSubmit.attributes('name')).toBe(schema.inputName)
      expect(buttonSubmit.attributes('disabled')).toBe('disabled')
      expect(buttonSubmit.attributes('class')).toBe(schema.inputClass)
    })
  })
})
