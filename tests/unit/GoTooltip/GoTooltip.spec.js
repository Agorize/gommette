import { createLocalVue, shallowMount } from '@vue/test-utils'
import * as AgoUikit from '../../../src'
import { GoTooltip } from '../../../src'

const localVue = createLocalVue()

localVue.use(AgoUikit)

describe('GoTooltip', () => {
  // Install
  it('should be installed', () => {
    expect(localVue.options.components['GoTooltip']).toBeTruthy()
  })
})
