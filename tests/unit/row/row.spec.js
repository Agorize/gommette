import { createLocalVue, mount } from '@vue/test-utils'
import * as AgoUikit from '../../../src'
import renderCases from './row.render-cases'

const localVue = createLocalVue()

localVue.use(AgoUikit)

describe('Row', () => {
  // Install
  it('should be installed', () => {
    expect(localVue.options.components['AgoRow']).toBeTruthy()
  })

  // Render testing
  renderCases.forEach(renderCase => {
    const [fromComp, toHtml] = renderCase

    it(`"${fromComp}" should render "${toHtml}"`, () => {
      const wrapper = mount({ template: fromComp }, { localVue })
      expect(wrapper.html()).toBe(toHtml)
    })
  })
})
