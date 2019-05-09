import { shallowMount, createLocalVue } from '@vue/test-utils'
import * as AgoUikit from '../../../src'
import { GoCookieConsent } from '../../../src'
import debounce from 'lodash.debounce'

const localVue = createLocalVue()

localVue.use(AgoUikit)

describe('GoCookieConsent', () => {
  let wrapper
  let checkNewOffset
  let checkOffset
  let debounceCheckOffset
  let closeCookieConsent
  let removeListener

  beforeEach(() => {
    checkNewOffset = jest.fn()
    checkOffset = jest.fn()
    debounceCheckOffset = jest.fn()

    wrapper = shallowMount(GoCookieConsent, {
      propsData: {
        textContent: 'text',
        acceptLabel: 'label',
      },
      localVue,
      attachToDocument: true,
      stubs: ['GoIcon'],
      methods: {
        checkNewOffset,
        checkOffset
      }
    })
  })

  // Install
  it('should be installed', () => {
    expect(localVue.options.components['GoCookieConsent']).toBeTruthy()
  })

  it('renders mounted cookie-consent', () => {
    expect(wrapper.name()).toBe('GoCookieConsent')
  })

  it('should call checkNewOffset method', async () => {
    expect(checkNewOffset).toBeCalled()
  })

  it('should set debounceCheckOffset function', () => {
    expect(JSON.stringify(wrapper.vm.debounceCheckOffset)).toEqual(JSON.stringify(debounce(checkNewOffset, 500)))
  })

  it('should add scroll event listener on window', async () => {
    await window.dispatchEvent(new CustomEvent('scroll', { detail: 2000 }))

    expect(checkOffset).toBeCalled()
  })

  it('should add resize event listener on window', async () => {
    wrapper.vm.debounceCheckOffset = debounceCheckOffset

    await window.dispatchEvent(new Event('resize'))
    // wait for debounce 500ms
    setTimeout(() => {
      expect(debounceCheckOffset).toBeCalled()
    }, 500)
  })

  describe('methods - onClick', () => {
    beforeEach(() => {
      closeCookieConsent = jest.fn()

      wrapper = shallowMount(GoCookieConsent, {
        propsData: {
          textContent: 'text',
          acceptLabel: 'label',
        },
        localVue,
        attachToDocument: true,
        stubs: ['GoIcon'],
        methods: {
          checkNewOffset,
          checkOffset,
          closeCookieConsent,
        }
      })

      wrapper.find({ref: 'accept-button'}).trigger('click')
    })

    it('should emit accept event', () => {
      expect(wrapper.emitted().accept).toBeTruthy()
    })

    it('should called closeCookieConsent method', () => {
      expect(closeCookieConsent).toBeCalled()
    })
  })

  describe('methods - onClose', () => {
    beforeEach(() => {
      closeCookieConsent = jest.fn()

      wrapper = shallowMount(GoCookieConsent, {
        propsData: {
          textContent: 'text',
          acceptLabel: 'label',
        },
        localVue,
        attachToDocument: true,
        stubs: ['GoIcon'],
        methods: {
          checkNewOffset,
          checkOffset,
          closeCookieConsent,
        }
      })

      wrapper.find({ref: 'close-button'}).trigger('click')
    })

    it('should emit onClose event', () => {
      expect(wrapper.emitted().onClose).toBeTruthy()
    })

    it('should called closeCookieConsent method', () => {
      expect(closeCookieConsent).toBeCalled()
    })
  })

  describe('methods - closeCookieConsent', () => {
    beforeEach(async () => {
      removeListener = jest.fn()

      wrapper = shallowMount(GoCookieConsent, {
        propsData: {
          textContent: 'text',
          acceptLabel: 'label',
        },
        localVue,
        attachToDocument: true,
        stubs: ['GoIcon'],
        methods: {
          checkNewOffset,
          checkOffset,
          removeListener,
        }
      })

      await wrapper.setData({
        open: true
      })

      wrapper.find({ref: 'close-button'}).trigger('click')
    })

    it('should called removeListener method', () => {
      expect(removeListener).toBeCalled()
    })

    it('should set open data to false', () => {
      expect(wrapper.vm.open).toBe(false)
    })
  })

  describe('methods - checkOffset', () => {
    beforeEach(() => {
      wrapper = shallowMount(GoCookieConsent, {
        propsData: {
          textContent: 'text',
          acceptLabel: 'label',
        },
        localVue,
        attachToDocument: true,
        stubs: ['GoIcon'],
        methods: {
          checkNewOffset
        }
      })

      window.dispatchEvent(new CustomEvent('scroll', { detail: 800 }))
      global.window.innerHeight = 200
    })

    it('should set to $refs["cookie-consent"] style position to absolute', async () => {
      await wrapper.vm.checkOffset()

      expect(wrapper.find({ref: 'cookie-consent'}).element.style.position).toBe('absolute')
    })

    describe('when the limit offset and document scroll height is lower than window scroll height', () => {
      beforeEach(() => {
        wrapper.setProps({
          // trick to set document.documentElement.scrollHeight - this.offsetHeight to positive value
          offsetHeight: -1200
        })
      })

      it('should set to $refs["cookie-consent"] style position to fixed', async () => {
        await wrapper.vm.checkOffset()
        expect(wrapper.find({ref: 'cookie-consent'}).element.style.position).toBe('fixed')
      })
    })
  })

  describe('methods - checkNewOffset', () => {
    beforeEach(() => {
      wrapper = shallowMount(GoCookieConsent, {
        propsData: {
          textContent: 'text',
          acceptLabel: 'label',
        },
        localVue,
        attachToDocument: true,
        stubs: ['GoIcon'],
        methods: {
          checkOffset
        }
      });

      wrapper.vm.checkNewOffset()
    })

    it('should called checkOffset method', () => {
      expect(checkOffset).toBeCalled()
    })
  })

  describe('methods - removeListener', () => {
    beforeEach(() => {
      wrapper.vm.removeListener()
    })

    it('should remove scroll event listener on window', async () => {
      await window.dispatchEvent(new CustomEvent('scroll', { detail: 1000 }))

      expect(checkOffset).not.toBeCalled()
    })

    // it should add event listener on window
    it('should remove resize event listener on window', async () => {
      wrapper.vm.debounceCheckOffset = debounceCheckOffset

      await window.dispatchEvent(new Event('resize'))
      // wait for debounce 500ms
      setTimeout(() => {
        expect(debounceCheckOffset).not.toBeCalled()
      }, 500)
    })
  })
})
