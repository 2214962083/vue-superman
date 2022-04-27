import {polyfillFetch} from 'superman-shared/test-utils'
import {beforeEach} from 'vitest'

polyfillFetch()

beforeEach(() => {
  document.body.innerHTML = ''
  document.head.innerHTML = ''
})
