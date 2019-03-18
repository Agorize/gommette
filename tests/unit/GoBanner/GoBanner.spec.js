import { createLocalVue, shallowMount } from '@vue/test-utils'
import * as AgoUikit from '../../../src'
import { GoBanner } from '../../../src'

const localVue = createLocalVue()

localVue.use(AgoUikit)

describe('GoBanner', () => {
  let wrapper
  // Install
  it('should be installed', () => {
    expect(localVue.options.components['GoBanner']).toBeTruthy()
  })

  describe('when component is mounted', () => {
    beforeEach(() => {
      wrapper = shallowMount(GoBanner, {
        localVue
      })
    })

    it('should not find close button ref', () => {
      expect(Object.keys(wrapper.vm.$refs).includes('go-banner__close')).toBeFalsy
    })

    describe('when props beClose is true', () => {
      beforeEach(() => {
        wrapper.setProps({
          beClose: true
        })
      })

      it('should find close button ref', () => {
        expect(Object.keys(wrapper.vm.$refs).includes('go-banner__close')).toBeTruthy
      })

      it('should emit an event when button close is trigger', async () => {
        const closeButton = wrapper.find({ ref: 'go-banner__close' })

        await closeButton.trigger('click')

        expect(wrapper.emitted().closeBanner).toBeTruthy()
      })
    })
  })
})
