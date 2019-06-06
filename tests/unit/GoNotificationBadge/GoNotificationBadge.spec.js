import { createLocalVue, shallowMount } from '@vue/test-utils'
import * as AgoUikit from '../../../src'
import { GoNotificationBadge } from '../../../src'

const localVue = createLocalVue()

localVue.use(AgoUikit)

describe('GoNotificationBadge', () => {
  let wrapper

  it('should be installed', () => {
    expect(localVue.options.components['GoNotificationBadge']).toBeTruthy()
  })

  describe('when component is mounted', () => {
    beforeEach(() => {
      wrapper = shallowMount(GoNotificationBadge, {
        localVue,
        propsData: {
          notificationCount: 5
        }
      })
    })

    it('should be display the notification count', () => {
      expect(wrapper.find('.badge').text()).toBe('5')
    })
  })
})
