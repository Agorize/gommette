import { createLocalVue, shallowMount } from '@vue/test-utils'
import * as AgoUikit from '../../../src'
import { GoIcon } from '../../../src'
import renderCases from './GoIcon.render-cases'

const localVue = createLocalVue()

localVue.use(AgoUikit)

describe('GoIcon', () => {
  // Install
  it('should be installed', () => {
    expect(localVue.options.components['GoIcon']).toBeTruthy()
  })
})
