import { createLocalVue, shallowMount } from '@vue/test-utils'
import * as AgoUikit from '../../../src'
import { GoDropdown } from '../../../src'

const localVue = createLocalVue()

localVue.use(AgoUikit)

describe('GoDropdown', () => {
  let wrapper
  // Install
  it('should be installed', () => {
    expect(localVue.options.components['GoDropdown']).toBeTruthy()
  })

  describe('when component is mounted', () => {
    beforeEach(() => {
      wrapper = shallowMount(GoDropdown, {
        localVue
      })
    })

    it('should have a closed dropdown', () => {
      expect(wrapper.props().isOpen).toEqual(false)
    })
  })

  describe('when component is mounted opened', () => {
    beforeEach(() => {
      wrapper = shallowMount(GoDropdown, {
        localVue,
        propsData: {
          isOpen: true
        }
      })
    })

    it('should have a opened dropdown', () => {
      expect(wrapper.props().isOpen).toEqual(true)
    })
  })
})
