import { createLocalVue, shallowMount } from '@vue/test-utils'
import * as AgoUikit from '../../../src'
import { GoToggle } from '../../../src'

const localVue = createLocalVue()

localVue.use(AgoUikit)

describe('GoToggle', () => {
  let wrapper

  it('should be installed', () => {
    expect(localVue.options.components['GoToggle']).toBeTruthy()
  })

  beforeEach(() => {
    wrapper = shallowMount(GoToggle, {
      localVue,
      stubs: { 'GoIcon': '<span class="go-icon"></span>' }
    })
  })

  describe('Active status', () => {
    it('should change active status on click', () => {
      wrapper.setProps({ value: false })

      expect(wrapper.vm.active).toBeFalsy()
      wrapper.find('label').trigger('click')
      expect(wrapper.vm.active).toBeTruthy()
      wrapper.find('label').trigger('click')
      expect(wrapper.vm.active).toBeFalsy()
    })
  })

  describe('Disabled status', () => {
    it('should not change the active status on click', () => {
      wrapper.setProps({
        value: false,
        disabled: true
      })

      expect(wrapper.vm.active).toBeFalsy()
      wrapper.find('label').trigger('click')
      expect(wrapper.vm.active).toBeFalsy()

      wrapper.setProps({ value: true })

      expect(wrapper.vm.active).toBeTruthy()
      wrapper.find('label').trigger('click')
      expect(wrapper.vm.active).toBeTruthy()
    })
  })

  describe('Active color', () => {
    beforeEach(() => {
      wrapper.setProps({ value: true })
    })

    it('should have a primary color as default', () => {
      expect(wrapper.find('label.primary').exists()).toBeTruthy()
    })

    const colors = ['primary', 'info', 'success', 'warning', 'danger']

    colors.forEach(activeColor => {
      it(`should have a ${activeColor} color`, () => {
        wrapper.setProps({ activeColor })
        expect(wrapper.find(`label.${activeColor}`).exists()).toBeTruthy()
      })
    })
  })

  describe('Icon', () => {
    beforeEach(() => {
      wrapper.setProps({ value: true })
    })

    it('should not show an icon', () => {
      expect(wrapper.find('.go-icon').exists()).toBeFalsy()
    })

    it('should show an icon', () => {
      wrapper.setProps({ activeIconName: 'yes' })
      expect(wrapper.find('.go-icon').exists()).toBeTruthy()
    })
  })
})
