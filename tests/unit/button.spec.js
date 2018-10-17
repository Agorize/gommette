import { createLocalVue, mount } from '@vue/test-utils'
import AgoUikit from '../../src'

const localVue = createLocalVue()

localVue.use(AgoUikit)

describe('Button', () => {
  it('should be installed', () => {
    expect(localVue.options.components['AgoButton']).toBeTruthy()
  })
})
