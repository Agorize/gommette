import { createLocalVue, shallowMount, mount } from '@vue/test-utils'
import { render } from '@vue/server-test-utils'
import * as AgoUikit from '../../../src'
import { GoAccordion } from '../../../src'

const localVue = createLocalVue()

localVue.use(AgoUikit)

describe('GoAccordion', () => {
  let wrapper
  let listItems
  const item = {
    title: 'My header',
    body: 'My text body My text body My text body  My text body  My text body  My text body'
  }

  beforeEach(() => {
    listItems = [
      {
        isActive: false,
        isFixed: true,
        title: '<h1>My header plop plop <b>plop</b></h1>',
        body: '<h3>My text body My text body My text body  My text body  My text body  My text body</h3>'
      },
      {
        isActive: false,
        isFixed: false,
        title: '<h1>My header <b>plop</b></h1>',
        body: '<h3>My text body My text body My text body  My text body  My text body  My text body</h3>'
      },
      {
        isActive: false,
        isFixed: false,
        title: '<h1>My header <b>plop</b></h1>',
        body: '<h3>My text body My text body My text body  My text body  My text body  My text body</h3>'
      }
    ]

    wrapper = shallowMount(GoAccordion, {
      localVue,
      propsData: {
        listItems
      }
    })
  })



  // Install
  it('should be installed', () => {
    expect(localVue.options.components['GoAccordion']).toBeTruthy()
  })

  // Describe with slot
  // describe('with slot go-collapse', () => {
  //   beforeEach(() => {
  //     localVue.component('go-collapse', GoCollapse)

  //     wrapper = mount(GoAccordion, {
  //       localVue,
  //       propsData: {
  //         listItems
  //       },
  //       scopedSlots: {
  //         default: `<template slot-scope="{ items }">
  //             <go-collapse
  //               v-for="(item, key) in items"
  //               :key="key"
  //               :index="key"
  //               :item="item"
  //               :beDeleted="true"
  //             />
  //           </template>
  //         `
  //       }
  //     })
  //   })

  // describe without slot
  describe('without slot go-collapse', () => {
    beforeEach(() => {
      wrapper = mount(GoAccordion, {
        localVue,
        propsData: {
          listItems
        }
      })
    })

    it('should have goCollapse on accordion', () => {
      expect(wrapper.vm.$refs['collapse'].length).toBe(listItems.length)
    })

    //
    // Describe Data items

    describe('Data - items', () => {
      it('should have list items look like listItems props', () => {
        expect(wrapper.vm.items).toEqual(listItems)
      })

      describe('when index present in listItems is set to props activeItems', () => {
        let activeItems = [0]

        beforeEach(() => {
          wrapper.setProps({
            activeItems: [activeItems]
          })
        })

        it('should have inital listItems with isActive property set to true on coresponding item', () => {
          const newItems = listItems.map((item, index) => {
            item.isActive = activeItems.includes(index) ? true : item.isActive

            return item
          })

          expect(wrapper.vm.items).toEqual(newItems)
        })
      })

      describe('when multi index present in listItems is set to props activeItems', () => {
        let activeItems = [0, 2, 3]

        beforeEach(() => {
          wrapper.setProps({
            activeItems: [activeItems]
          })
        })

        it('should have inital listItems with isActive property set to true on coresponding item', () => {
          const newItems = listItems.map((item, index) => {
            item.isActive = activeItems.includes(index) ? true : item.isActive

            return item
          })

          expect(wrapper.vm.items).toEqual(newItems)
        })
      })

      describe('when click on collapse item', () => {
        const togglePropertyActive = function (wrap) {
          wrap.vm.$refs['collapse'].forEach((ref, index) => {
            const button = ref.$refs['collapse__button']

            button.click()
            expect(wrap.vm.items[index].isActive).toBe(true)
            button.click()
            expect(wrap.vm.items[index].isActive).toBe(false)
          })
        }

        it('should toggle property isActive of item clicked', () => {
          togglePropertyActive(wrapper)
        })

        it('should set false boolean to other items', async () => {
          const firstButton = wrapper.vm.$refs['collapse'][0].$refs['collapse__button']
          const secondButton = wrapper.vm.$refs['collapse'][1].$refs['collapse__button']

          await firstButton.click()

          expect(wrapper.vm.items[0].isActive).toBe(true)
          expect(wrapper.vm.items[1].isActive).toBe(false)

          await secondButton.click()

          expect(wrapper.vm.items[0].isActive).toBe(false)
          expect(wrapper.vm.items[1].isActive).toBe(true)
        })

        describe('when isMultiple props is set to true', () => {
          beforeEach(() => {
            wrapper.setProps({
              isMultiple: true
            })
          })

          it('should toggle property isActive of item clicked', () => {
            togglePropertyActive(wrapper)
          })

          it('should render other items with same property isActive', async () => {
            const firstButton = wrapper.vm.$refs['collapse'][0].$refs['collapse__button']
            const secondButton = wrapper.vm.$refs['collapse'][1].$refs['collapse__button']
            const thirdButton = wrapper.vm.$refs['collapse'][2].$refs['collapse__button']

            await firstButton.click()

            expect(wrapper.vm.items[0].isActive).toBe(true)
            expect(wrapper.vm.items[1].isActive).toBe(false)
            expect(wrapper.vm.items[2].isActive).toBe(false)

            await secondButton.click()

            expect(wrapper.vm.items[0].isActive).toBe(true)
            expect(wrapper.vm.items[1].isActive).toBe(true)
            expect(wrapper.vm.items[2].isActive).toBe(false)

            await thirdButton.click()

            expect(wrapper.vm.items[0].isActive).toBe(true)
            expect(wrapper.vm.items[1].isActive).toBe(true)
            expect(wrapper.vm.items[1].isActive).toBe(true)

            await firstButton.click()

            expect(wrapper.vm.items[0].isActive).toBe(false)
            expect(wrapper.vm.items[1].isActive).toBe(true)
            expect(wrapper.vm.items[2].isActive).toBe(true)
          })
        })
      })
    })

    //
    // Describe computed normalizeDragOptions

    describe('Computed - normalizeDragOptions', () => {
      const baseOptions = {
        animation: 300,
        disabled: false,
        ghostClass: 'ghost'
      }

      it('should have property with base options', () => {
        expect(wrapper.vm.normalizeDragOptions).toEqual(baseOptions)
      })

      describe('when dragOptions is set to props', () => {
        const dragOptions = {
          sort: false,
          dragClass: 'sortable-drag',
        }

        beforeEach(() => {
          wrapper.setProps({
            dragOptions
          })
        })

        it('should have property with base options and dragOptions', () => {
          expect(wrapper.vm.normalizeDragOptions).toEqual({
            ...baseOptions,
            ...dragOptions
          })
        })
      })

      describe('when dragOptions who override existing properties is set to props', () => {
        const dragOptions = {
          animation: 500,
          disabled: true,
        }

        beforeEach(() => {
          wrapper.setProps({
            dragOptions
          })
        })

        it('should have property with base options and dragOptions', () => {
          expect(wrapper.vm.normalizeDragOptions).toEqual({
            ...baseOptions,
            ...dragOptions
          })
        })
      })
    })

    //
    // Describe onMove

    describe('Method - onMove', () => {
      let data

      beforeEach(() => {
        data = {
          draggedContext: {
            element: {
              isFixed: false
            }
          },
          relatedContext: {}
        }
      })

      describe('when related element is not present and drag element is not fixed', () => {
        it('should return false', () => {
          expect(wrapper.vm.onMove(data)).toBe(false)
        })
      })

      describe('when related element is not present and drag element is fixed', () => {
        beforeEach(() => {
          data.draggedContext.element.isFixed = true
        })

        it('should return false', () => {
          expect(wrapper.vm.onMove(data)).toBe(false)
        })
      })

      describe('when related element is present', () => {
        beforeEach(() => {
          data.relatedContext.element = {
            isFixed: false
          }
        })

        describe('when related element is not fixed and drag element is not fixed', () => {
          it('should return true', () => {
            expect(wrapper.vm.onMove(data)).toBe(true)
          })
        })

        describe('when related element is not fixed and drag element is fixed', () => {
          beforeEach(() => {
            data.draggedContext.element = {
              isFixed: true
            }
          })

          it('should return false', () => {
            expect(wrapper.vm.onMove(data)).toBe(false)
          })
        })

        describe('when related element is fixed and drag element is not fixed', () => {
          beforeEach(() => {
            data.relatedContext.element = {
              isFixed: true
            }
          })

          it('should return false', () => {
            expect(wrapper.vm.onMove(data)).toBe(false)
          })
        })

      })
    })

    //
    // Describe Method update

    describe('Method - update', () => {
      let draggableComponent

      beforeEach(() => {
        draggableComponent = wrapper.find({ ref: 'draggable' })
        draggableComponent.vm.$emit('end')
      })

      it('should emit update event with items in params', () => {
        expect(wrapper.emitted().update.length).toBe(1)
        expect(wrapper.emitted().update[0]).toEqual([listItems])
      })

      it('should set dragging to false after nextTick', () => {
        expect(wrapper.vm.dragging).toBe(false)
      })
    })

    //
    // Describe Method destroyItem

    describe('Method - destroyItem', () => {
      let draggableComponent

      beforeEach(() => {
        draggableComponent = wrapper.find({ ref: 'draggable' })
        draggableComponent.vm.$emit('destroyItem')
      })

      it('should emit destroyItem event with items in params', () => {
        expect(wrapper.emitted().destroyItem.length).toBe(1)
        expect(wrapper.emitted().destroyItem[0]).toEqual([listItems])
      })

      it('should set dragging to false after nextTick', () => {
        expect(wrapper.vm.dragging).toBe(false)
      })
    })
  })
})
