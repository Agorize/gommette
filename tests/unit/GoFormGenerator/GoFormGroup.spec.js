import { createLocalVue, shallowMount } from '@vue/test-utils'
import * as AgoUikit from '../../../src'
import { GoFormGroup } from '../../../src'
import renderCases from './GoFormGroup.render-cases'

const localVue = createLocalVue()

localVue.use(AgoUikit)

describe('GoFormGroup', () => {
  // Install
  it('should be installed', () => {
    expect(localVue.options.components['GoFormGroup']).toBeTruthy()
  })

  // Render testing
  // renderCases.forEach(renderCase => {
  //   const [fromComp, toHtml] = renderCase

  //   it(`"${fromComp}" should render "${toHtml}"`, () => {
  //     const wrapper = mount({ template: fromComp }, { localVue })
  //     expect(wrapper.html()).toBe(toHtml)
  //   })
  // })
})
