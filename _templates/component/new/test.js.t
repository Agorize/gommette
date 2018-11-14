---
to: "tests/unit/<%= needFolderName ? componentName : folderName %>/<%= componentName %>.spec.js"
unless_exists: true
---
import { createLocalVue, mount } from '@vue/test-utils'
import AgoUikit from '../../../src'
import renderCases from './render-cases'

const localVue = createLocalVue()

localVue.use(AgoUikit)

describe('Row', () => {
  // Install
  it('should be installed', () => {
    expect(localVue.options.components['<%= componentName %>']).toBeTruthy()
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
