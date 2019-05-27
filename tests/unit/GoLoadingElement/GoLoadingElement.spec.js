import { createLocalVue } from '@vue/test-utils'
import * as AgoUikit from '../../../src'
import { GoLoadingElement } from '../../../src'
import renderCases from './GoLoadingElement.render-cases'

const localVue = createLocalVue()

localVue.use(AgoUikit)

describe('GoLoadingElement', () => {
  // Install
  it('should be installed', () => {
    expect(localVue.options.components['GoLoadingElement']).toBeTruthy()
  })
})
