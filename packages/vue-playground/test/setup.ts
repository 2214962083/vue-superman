import {polyfillFetch, polyfillPointerEvents} from 'superman-shared/test-utils'
import {setupVueSwitch} from 'superman-shared/test-vue-utils'
import {beforeAll, beforeEach} from 'vitest'

polyfillFetch()
polyfillPointerEvents()

setupVueSwitch()

beforeAll(() => {
  setupVueSwitch()
})

beforeEach(() => {
  document.body.innerHTML = ''
  document.head.innerHTML = ''
})
