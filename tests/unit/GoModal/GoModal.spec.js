import { createLocalVue, shallowMount } from '@vue/test-utils'
import * as AgoUikit from '../../../src'
import * as uiv from 'uiv'
import { GoModal } from '../../../src'

const localVue = createLocalVue()

localVue.use(AgoUikit)
localVue.use(uiv)

describe('GoModal', () => {
  let wrapper
  // Install
  it('should be installed', () => {
    expect(localVue.options.components['GoModal']).toBeTruthy()
  })

  describe('when component is mounted', () => {
    beforeEach(() => {
      wrapper = shallowMount(GoModal, {
        localVue
      })
    })

    it('should have a modal with large size class', () => {
      expect(wrapper.props().modalSize).toEqual('lg')
    })

    it('should have a closed modal', () => {
      expect(wrapper.props().modalOpen).toEqual(false)
    })
  })

  describe('when component is mounted with small size', () => {
    beforeEach(() => {
      wrapper = shallowMount(GoModal, {
        localVue,
        propsData: {
          modalSize: 'sm'
        }
      })
    })

    it('should find modal with small size class', () => {
      expect(wrapper.props().modalSize).toEqual('sm')
    })
  })
})
