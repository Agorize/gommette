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

    it('should not find modalOpen ref', () => {
      expect(Object.keys(wrapper.vm.$refs).includes('go-banner__modalOpen')).toBeFalsy
    })
  })
})
