import { createLocalVue, mount } from '@vue/test-utils'
import * as AgoUikit from '../../../src'
import { GoTab } from '../../../src'

const localVue = createLocalVue()

localVue.use(AgoUikit)

describe('GoTab', () => {
  let wrapper;

  // Install
  it('should be installed', () => {
    expect(localVue.options.components['GoTab']).toBeTruthy()
  })

  beforeEach(() => {
    wrapper = mount(GoTab, {
      localVue
    })
  })

  describe('when tab props is defined', () => {
    beforeEach(() => {
      wrapper.setProps({
        tabs: [
          {
            id: 42,
            title: 'my-title'
          }
        ],
      })
    })

    it('should render a link', () => {
      expect(wrapper.find('ul.nav a').exists()).toBeTruthy()
    })

    it('should render the title of the link', () => {
      expect(wrapper.find('ul.nav a').text()).toBe('my-title')
    })

    it('should not have a href on the link', () => {
      expect(wrapper.find('ul.nav a').attributes('href')).toBe(undefined);
    })

    describe('when url is defined', () => {
      beforeEach(() => {
        wrapper.setProps({
          tabs: [
            {
              id: 1,
              title: 'my-title',
              url: 'my-url'
            }
          ],
        })
      })

      it('should have a href on the link', () => {
        expect(wrapper.find('ul.nav a').attributes('href')).toBe('my-url')
      })
    })

    describe('when user click on a tab', () => {
      beforeEach(() => {
        wrapper.find('ul.nav li a').trigger('click')
      })

      it('should emit an input event', () => {
        expect(wrapper.emitted().input).toBeTruthy()
      })

      it('should emit an update event', () => {
        expect(wrapper.emitted().update).toBeTruthy()
      })

      it('should set activeTab', () => {
        expect(wrapper.vm.activeTab.id).toBe(42)
      })

      describe('when tabId is the same as activeTab id', () => {
        beforeEach(() => {
          wrapper = mount(GoTab, {
            localVue,
            propsData: {
              tabs: [
                {
                  id: 42,
                  title: 'my-title'
                },
              ],
              activeTab: {
                id: 42,
                title: 'my-title'
              }
            }
          })
        })

        it('should not call the update event', () => {
          expect(wrapper.emitted().update).toBeFalsy()
        })
      })
    })
  })

  describe('created()', () => {
    beforeEach(() => {
      GoTab.methods.selectTab = jest.fn()

      wrapper = mount(GoTab, {
        localVue,
        propsData: {
          tabs: [
            {
              id: 42,
              title: 'my-title'
            },
            {
              id: 52,
              title: 'my-title-2'
            }
          ]
        }
      })
    })

    it('should have `created` hook', () => {
      expect(typeof GoTab.created).toBe('function')
    })

    it('should call selectTab method the first tab', () => {
      expect(GoTab.methods.selectTab).toHaveBeenCalledWith({ 'tabId': wrapper.vm.tabs[0].id })
    })

    describe('when defaultActiveTabId is set', () => {
      it('should call selectTab method with the correct tab', () => {
        wrapper = mount(GoTab, {
          localVue,
          propsData: {
            tabs: [
              {
                id: 42,
                title: 'my-title'
              },
              {
                id: 52,
                title: 'my-title-2'
              }
            ],
            defaultActiveTabId: 52
          }
        })
        expect(GoTab.methods.selectTab).toHaveBeenCalledWith({ 'tabId': wrapper.vm.tabs[1].id} )
      })
    })
  })

  describe('mounted()', () => {
    it('should have `mounted` hook', () => {
      expect(typeof GoTab.mounted).toBe('function')
    })
  });
})
