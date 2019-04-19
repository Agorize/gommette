import {
  createLocalVue,
  shallowMount
} from '@vue/test-utils'
import * as AgoUikit from '../../../src'
import {
  GoFieldTextarea
} from '../../../src'

const localVue = createLocalVue()
localVue.use(AgoUikit)

describe('GoFieldTextarea', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(GoFieldTextarea, {
      localVue,
      propsData: {
        value: 'comment'
      }
    })
  })

  // Install
  it('should be installed', () => {
    expect(localVue.options.components['GoFieldTextarea']).toBeTruthy()
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
    const valueExpected = 'my comment'
    const input = wrapper.find({
      ref: 'textarea'
    })

    input.setValue(valueExpected)

    expect(wrapper.emitted().input).toBeTruthy()
    expect(wrapper.emitted().input.length).toBe(1)
    expect(wrapper.emitted().input[0]).toEqual([valueExpected])
  })
})
