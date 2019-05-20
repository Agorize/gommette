import { createLocalVue, shallowMount } from '@vue/test-utils'
import moment from 'moment'
import * as AgoUikit from '../../../src'
import { GoCountdown } from '../../../src'
import testCases from './test-cases'

const localVue = createLocalVue()

localVue.use(AgoUikit)

describe('GoCountdown', () => {
  let wrapper

  // Install
  it('should be installed', () => {
    expect(localVue.options.components['GoCountdown']).toBeTruthy()
  })

  beforeEach(() => {
    wrapper = shallowMount(GoCountdown, {
      localVue,
      propsData: {
        endDateString: moment.utc().add(1, 'days').format()
      }
    })
  })

  it('should be visible', () => {
    expect(wrapper.find('.go-countdown').exists()).toBeTruthy()
  })

  it('should be the right days amount', () => {
    wrapper = shallowMount(GoCountdown, {
      localVue,
      propsData: {
        endDateString: moment.utc().add(42, 'days').format()
      }
    })

    expect(wrapper.vm.remainingDays).toBe(42)
  })

  describe('when it is close to the end', () => {
    it('should add text-warning class', () => {
      wrapper = shallowMount(GoCountdown, {
        localVue,
        propsData: {
          endDateString: moment.utc().add(3, 'days').format()
        }
      })

      expect(wrapper.find('.go-countdown.text-warning').exists()).toBeTruthy()
    })
  })

  describe('Time is out', () => {
    it('should not be visible', () => {
      wrapper = shallowMount(GoCountdown, {
        localVue,
        propsData: {
          endDateString: '2016-04-23'
        }
      })

      expect(wrapper.find('.go-countdown').exists()).toBeFalsy()
    })

    describe('"visibleWhenTimesOut" prop', () => {
      it('should not be visible when prop set to false', () => {
        wrapper = shallowMount(GoCountdown, {
          localVue,
          propsData: {
            endDateString: '2016-04-23',
            visibleWhenTimesOut: false
          }
        })

        expect(wrapper.find('.go-countdown').exists()).toBeFalsy()
      })

      it('should be visible when prop set to true', () => {
        wrapper = shallowMount(GoCountdown, {
          localVue,
          propsData: {
            endDateString: '2016-04-23',
            visibleWhenTimesOut: true
          }
        })

        expect(wrapper.find('.go-countdown').exists()).toBeTruthy()
      })
    })

    describe('"daysBeforeRealtime" prop', () => {
      it('should be a realtime countdown', () => {
        testCases.realtimeCountdown.truthy
          .forEach(({ endDateString, daysBeforeRealtime }) => {
            wrapper = shallowMount(GoCountdown, {
              localVue,
              propsData: {
                endDateString,
                daysBeforeRealtime
              }
            })

            expect(wrapper.vm.isItRealtime).toBeTruthy()
          })
      })

      it('should not be a realtime countdown', () => {
        testCases.realtimeCountdown.falsy
          .forEach(({ endDateString, daysBeforeRealtime }) => {
            wrapper = shallowMount(GoCountdown, {
              localVue,
              propsData: {
                endDateString,
                daysBeforeRealtime
              }
            })

            expect(wrapper.vm.isItRealtime).toBeFalsy()
          })
      })
    })
  })
})
