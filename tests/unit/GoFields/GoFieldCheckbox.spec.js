import { createLocalVue, shallowMount } from '@vue/test-utils'
import * as AgoUikit from '../../../src'
import { GoFieldCheckbox } from '../../../src'

const localVue = createLocalVue()
localVue.use(AgoUikit)

describe('GoFieldCheckbox', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(GoFieldCheckbox, {
      localVue,
      propsData: {
        value: false
      }
    })
  })

  // Install
  it('should be installed', () => {
    expect(localVue.options.components['GoFieldCheckbox']).toBeTruthy()
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

  it('should emit change event with the input value', async () => {
    const input = wrapper.find({ ref: 'checkbox' })
    const initValue = wrapper.vm.value

    await input.trigger('click')

    expect(wrapper.emitted().change).toBeTruthy()
    expect(wrapper.emitted().change.length).toBe(1)
    expect(wrapper.emitted().change[0]).toEqual([!initValue])

    await input.trigger('click')

    expect(wrapper.emitted().change).toBeTruthy()
    expect(wrapper.emitted().change.length).toBe(2)
    expect(wrapper.emitted().change[1]).toEqual([initValue])
  })

  // Computed - wrapperClasses
  describe('Computed wrapperClasses', () => {
    it('should return default class', () => {
      expect(wrapper.vm.wrapperClasses).toBe('checkbox')
    })

    describe('when wrapperClasses is present on props data', () => {
      const wrapperClasses = 'newClass otherNewClass'

      beforeEach(() => {
        wrapper.setProps({
          schema: {
            wrapperClasses,
          }
        })
      })

      it('should return default class with wrapperClasses', () => {
        expect(wrapper.vm.wrapperClasses).toBe(`${wrapperClasses} checkbox`)
      })
    })

    describe('when component is disabled', () => {
      beforeEach(() => {
        wrapper.setProps({
          disabled: true,
        })
      })

      it('should return default class with disabled class', () => {
        expect(wrapper.vm.wrapperClasses).toBe('checkbox disabled')
      })
    })

    describe('when component is disabled and wrapperClasses is present', () => {
      const wrapperClasses = 'newClass otherNewClass'

      beforeEach(() => {
        wrapper.setProps({
          disabled: true,
          schema: {
            wrapperClasses,
          },
        })
      })

      it('should return default class with disabled class', () => {
        expect(wrapper.vm.wrapperClasses).toBe(`${wrapperClasses} checkbox disabled`)
      })
    })
  })
})
