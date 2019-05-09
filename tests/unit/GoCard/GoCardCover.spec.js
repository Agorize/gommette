import { createLocalVue, shallowMount } from '@vue/test-utils'
import * as AgoUikit from '../../../src'
import GoCardCover from '../../../src/components/GoCard/GoCardCover.vue'

const localVue = createLocalVue()

localVue.use(AgoUikit)

describe('GoCardCover', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(GoCardCover, {
      localVue,
      stubs: {
        'go-icon': '<div id="go-icon"></div>',
      }
    })
  })

  it('should contains bg thumbnail class', () => {
    expect(wrapper.find('.thumbnail').exists()).toBeTruthy()
  })

  it('should not render GoIcon component', () => {
    expect(wrapper.find('#go-icon').exists()).toBeFalsy()
  })

  it('should not render banner element', () => {
    expect(wrapper.find('.banner').exists()).toBeFalsy()
  })

  describe('when imgUrl prop is defined', () => {
    it ('should have a imgUrl', () => {
      wrapper.setProps({ imgUrl: 'http://my-background-image' });
      expect(wrapper.find('.bg').element.style.backgroundImage).toBe('url(http://my-background-image)')
    })
  })

  describe('when cardPath prop is defined', () => {
    it('should have a over-link element', () => {
      wrapper.setProps({ cardPath: '/my-path' });
      expect(wrapper.contains('header.thumbnail a.over-link')).toBe(true)
    })
  })

  describe('when overlay props is defined', () => {
    beforeEach(() => {
      wrapper.setProps({
        overlay: {
          active: true,
          iconName: 'my-name',
          text: 'my-text'
        }
      })
    })

    it('should render GoIcon component', () => {
      expect(wrapper.find('#go-icon').exists()).toBeTruthy()
    })

    it('should fill name prop of the GoIcon component', () => {
     expect(wrapper.find('#go-icon').vm.name).toBe('my-name')
    })

    it('should display the overlay text', () => {
     expect(wrapper.find('.overlay').text()).toBe('my-text')
    })
  })

  describe('when banner props is defined', () => {
    beforeEach(() => {
      wrapper.setProps({
        banner: {
          active: true,
          backgroundColorHexa: 'fff',
          title: 'my-title'
        }
      })
    })

    it('should render banner element', () => {
      expect(wrapper.find('.banner').exists()).toBeTruthy()
    })

    it('should fill banner background color hexa to the banner element', () => {
      expect(wrapper.find('.banner').element.style.backgroundColor).toBe('rgb(255, 255, 255)')
    })

    it('should render banner title', () => {
      expect(wrapper.find('.banner').text()).toBe('my-title')
    })

    it('should not display the link', () => {
     expect(wrapper.find('.banner a').exists()).toBe(false)
    })

    describe('when url is set', () => {
      beforeEach(() => {
        wrapper.setProps({
          banner: {
            active: true,
            title: 'my-title',
            url: 'my-url'
          }
        })
      })

      it('should render the link', () => {
        expect(wrapper.find('.banner a').exists()).toBe(true)
      })

      it('should render the title of the link', () => {
        expect(wrapper.find('.banner a').text()).toBe('my-title')
      })
    })
  })
});
