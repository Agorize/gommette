import { createLocalVue, shallowMount } from '@vue/test-utils'
import * as AgoUikit from '../../../src'
import { GoFieldInput } from '../../../src'
import renderCases from './GoFieldInput.render-cases'

const localVue = createLocalVue()

localVue.use(AgoUikit)

describe('GoFieldInput', () => {
  // Install
  it('should be installed', () => {
    expect(localVue.options.components['GoFieldInput']).toBeTruthy()
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
