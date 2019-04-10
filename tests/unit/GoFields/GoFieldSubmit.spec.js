import { createLocalVue, shallowMount } from '@vue/test-utils'
import * as AgoUikit from '../../../src'
import { GoFieldSubmit } from '../../../src'
import renderCases from './GoFieldSubmit.render-cases'

const localVue = createLocalVue()

localVue.use(AgoUikit)

describe('GoFieldSubmit', () => {
  // Install
  it('should be installed', () => {
    expect(localVue.options.components['GoFieldSubmit']).toBeTruthy()
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
