import { createLocalVue, shallowMount } from '@vue/test-utils'
import * as AgoUikit from '../../../src'
import { GoCollapse, GoAccordion } from '../../../src'

const localVue = createLocalVue()

localVue.use(AgoUikit)

describe('GoCollapse', () => {
  let wrapper
  const item = {
    title: 'My header',
    body: 'My text body My text body My text body  My text body  My text body  My text body'
  }

  beforeEach(() => {
    wrapper = shallowMount(GoCollapse, {
      localVue,
      propsData: {
        item
      }
    })
  })

  // Install
  it('should be installed', () => {
    expect(localVue.options.components['GoCollapse']).toBeTruthy()
  })

  // Computed property - isActive
  describe('Computed - isActive', () => {
    it('should have not an accordion provider', () => {
      expect(wrapper.vm.accordion).toBeNull()
    })

    it('should return false', () => {
      expect(wrapper.vm.isActive).toBe(false)
    })

    describe('when isActive property on item is set to true', () => {
      beforeEach(() => {
        const newItem = {
          ...item,
          isActive: true
        }

        wrapper = shallowMount(GoCollapse, {
          localVue,
          propsData: {
            item: newItem
          }
        })
      })

      it('should return true', () => {
        expect(wrapper.vm.isActive).toBe(true)
      })
    })

    describe('when have an accordion provider', () => {
      beforeEach(() => {
        const parent = shallowMount(GoAccordion, {
          localVue,
          propsData: {
            listItems: [item]
          }
        })

        wrapper = shallowMount(GoCollapse, {
          localVue,
          propsData: {
            item
          },
          provide: {
            accordion: parent.vm
          }
        })
      })

      it('should have an accordion provider', () => {
        expect(wrapper.vm.accordion).toBeDefined()
      })

      it('should return false', () => {
        expect(wrapper.vm.isActive).toBe(false)
      })

      describe('when isActive property on item is set to true', () => {
        beforeEach(() => {
          let newItem = {...item}

          newItem.isActive = true
          wrapper.setProps({
            item: newItem
          })
        })

        it('should return true', () => {
          expect(wrapper.vm.isActive).toBe(true)
        })
      })
    })
  })

  // Computed property - isAnimated
  describe('Computed - isAnimated', () => {
    it('should have not an accordion provider', () => {
      expect(wrapper.vm.accordion).toBeNull()
    })

    it('should return true', () => {
      expect(wrapper.vm.isAnimated).toBe(true)
    })

    describe('when have an accordion provider', () => {
      let parent

      beforeEach(() => {
        parent = shallowMount(GoAccordion, {
          localVue,
          propsData: {
            listItems: [item]
          }
        })

        wrapper = shallowMount(GoCollapse, {
          localVue,
          propsData: {
            item
          },
          provide: {
            accordion: parent.vm
          }
        })
      })

      it('should have an accordion provider', () => {
        expect(wrapper.vm.accordion).toBeDefined()
      })

      it('should return true', () => {
        expect(wrapper.vm.isAnimated).toBe(true)
      })

      describe('when dragging property on accordion is set to true', () => {
        beforeEach(() => {
          parent.setData({ dragging: true })
        })

        it('should return false', () => {
          expect(wrapper.vm.isAnimated).toBe(false)
        })
      })
    })
  })

  // Computed property - isDraggable
  describe('Computed - isDraggable', () => {
    it('should return false', () => {
      expect(wrapper.vm.isDraggable).toBe(false)
    })

    describe('when have an accordion provider', () => {
      let parent

      beforeEach(() => {
        parent = shallowMount(GoAccordion, {
          localVue,
          propsData: {
            listItems: [item]
          }
        })

        wrapper = shallowMount(GoCollapse, {
          localVue,
          propsData: {
            item
          },
          provide: {
            accordion: parent.vm
          }
        })
      })

      it('should have an accordion provider', () => {
        expect(wrapper.vm.accordion).toBeDefined()
      })

      it('should return true', () => {
        expect(wrapper.vm.isDraggable).toBe(true)
      })

      describe('when isFixed property on item is set to true', () => {
        beforeEach(() => {
          const newItem = {...item}

          newItem.isFixed = true
          wrapper.setProps({
            item: newItem
          })
        })

        it('should return false', () => {
          expect(wrapper.vm.isDraggable).toBe(false)
        })
      })

      describe('when draggable is disabled on accordion', () => {
        beforeEach(() => {
          parent.setProps({
            dragOptions: {
              disabled: true
            }
          })
        })

        it('should return false', () => {
          expect(wrapper.vm.isDraggable).toBe(false)
        })
      })
    })
  })

  // Method - toggleCollapse
  describe('Method - toggleCollapse', () => {
    const testToggleisActive = async function (wrap) {
      const buttonCollapse = wrap.find({ ref: 'collapse__button' })
      const isActive = wrap.vm.isActive

      await buttonCollapse.trigger('click')

      expect(wrap.vm.isActive).toBe(!isActive)

      await buttonCollapse.trigger('click')

      expect(wrap.vm.isActive).toBe(isActive)
    }

    it('should toggle property isActive when click on collapse button', () => {
      testToggleisActive(wrapper)
    })

    describe('when have an accordion provider', () => {
      beforeEach(() => {
        const parent = shallowMount(GoAccordion, {
          localVue,
          propsData: {
            listItems: [item]
          }
        })

        wrapper = shallowMount(GoCollapse, {
          localVue,
          propsData: {
            item
          },
          provide: {
            accordion: parent.vm
          }
        })
      })

      it('should toggle property isActive when click on collapse button', () => {
        testToggleisActive(wrapper)
      })
    })
  })

  // Method - destroyItem
  describe('Method - destroyItem', () => {
    describe('when item has beDeleted props set to true', () => {
      beforeEach(() => {
        wrapper.setProps({
          beDeleted: true
        })
      })

      it('should emit an event when button destroy is trigger', async () => {
        const deleteButton = wrapper.find({ ref: 'header__delete' })
        const spyParent = jest.fn()
        const spy = jest.fn()

        wrapper.vm.$on('destroyItem', spy)
        wrapper.vm.$parent.$on('destroyItem', spyParent)

        await deleteButton.trigger('click')

        expect(spy).toHaveBeenCalledTimes(1)
        expect(spyParent).toHaveBeenCalledTimes(0)
      })

      describe('when have an accordion provider', () => {
        beforeEach(() => {
          const parent = shallowMount(GoAccordion, {
            localVue,
            propsData: {
              listItems: [item]
            }
          })

          wrapper = shallowMount(GoCollapse, {
            localVue,
            propsData: {
              item,
              beDeleted: true
            },
            provide: {
              accordion: parent.vm
            }
          })
        })

        it('should emit an event on parent when button destroy is trigger', async () => {
          const deleteButton = wrapper.find({ ref: 'header__delete' })
          const spyParent = jest.fn()
          const spy = jest.fn()

          wrapper.vm.$on('destroyItem', spy)
          wrapper.vm.$parent.$on('destroyItem', spyParent)

          await deleteButton.trigger('click')

          expect(spy).toHaveBeenCalledTimes(0)
          expect(spyParent).toHaveBeenCalledTimes(1)
        })

        it('should remove self when button destroy is trigger', async () => {
          const deleteButton = wrapper.find({ ref: 'header__delete' })

          await deleteButton.trigger('click')

          expect(wrapper.find({ ref: 'collapse' })).toBeNull
        })
      })
    })
  })
})
