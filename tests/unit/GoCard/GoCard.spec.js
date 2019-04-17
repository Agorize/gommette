import { createLocalVue, shallowMount } from '@vue/test-utils'
import * as AgoUikit from '../../../src'
import { GoCard } from '../../../src'

const localVue = createLocalVue()

localVue.use(AgoUikit)

describe('GoCard', () => {
  let wrapper

  // Install
  it('should be installed', () => {
    expect(localVue.options.components['GoCard']).toBeTruthy()
  })

  beforeEach(() => {
    wrapper = shallowMount(GoCard, {
      localVue
    })
  })

  it('should contain my default slot', () => {
    wrapper = shallowMount(GoCard, {
      localVue,
      slots: {
        default: '<div class="my-default-slot"></div>'
      }
    });
    expect(wrapper.find('.my-default-slot').exists()).toBeTruthy()
  })

  describe('when cover slot is defined', () => {
    beforeEach(() => {
      wrapper = shallowMount(GoCard, {
        localVue,
        slots: {
          cover: '<div class="my-cover"></div>'
        }
      });
    });

    it('should render the cover slot', () => {
      expect(wrapper.find('.my-cover').exists()).toBeTruthy()
    })
  });

  describe('GoCardCover visibility', () => {

    beforeEach(() => {
      wrapper = shallowMount(GoCard, {
        stubs: { 'go-card-cover': '<div id="go-card-cover"></div>' }
      })
    });

    it('should not render GoCardCover component', () => {
      expect(wrapper.find('#go-card-cover').exists()).toBeFalsy()
    });

    describe('when cover prop is defined', () => {
      it('should render GoCardCover component', () => {
        wrapper.setProps({ cover: {} })
        expect(wrapper.find('#go-card-cover').exists()).toBeTruthy()
      });
    })
  });
})
