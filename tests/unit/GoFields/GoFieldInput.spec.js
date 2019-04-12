import { createLocalVue, shallowMount } from '@vue/test-utils'
import * as AgoUikit from '../../../src'
import { GoFieldInput } from '../../../src'

const localVue = createLocalVue()
localVue.use(AgoUikit)

describe('GoFieldInput', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(GoFieldInput, {
      localVue,
      propsData: {
        value: 'first name'
      }
    })
  })

  // Install
  it('should be installed', () => {
    expect(localVue.options.components['GoFieldInput']).toBeTruthy()
  })

  it('should have vee-validate errors register', () => {
    expect(wrapper.vm.errors.items).toBeDefined()
  })

  it('should have not registered vee-validate error(s)', () => {
    expect(wrapper.vm.errors.items).toEqual([])
  })

  it('should have input value equal to v-model passed in valueInput prop', () => {
    expect(wrapper.vm.valueInput).toEqual(wrapper.vm.value)
  })

  it('should emit input event with the input value', () => {
    const valueExpected = 'my name'
    const input = wrapper.find({ref: 'input'})

    input.setValue(valueExpected)

    expect(wrapper.emitted().input).toBeTruthy()
    expect(wrapper.emitted().input.length).toBe(1)
    expect(wrapper.emitted().input[0]).toEqual([valueExpected])
  })
})
