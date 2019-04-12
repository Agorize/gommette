import { createLocalVue, shallowMount } from '@vue/test-utils'
import * as AgoUikit from '../../../src'
import { GoFormGenerator } from '../../../src'
import renderCases from './GoFormGenerator.render-cases'

const localVue = createLocalVue()

localVue.use(AgoUikit)

describe('GoFormGenerator', () => {
  // Install
  it('should be installed', () => {
    expect(localVue.options.components['GoFormGenerator']).toBeTruthy()
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
