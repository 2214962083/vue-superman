import {Vue2, install, isVue2} from 'vue-demi'
import './polyfill-fetch'
import './polyfill-pointer-events'
import {beforeAll, beforeEach} from 'vitest'

const setupVueSwitch = () => {
  if (isVue2) {
    Vue2.config.productionTip = false
    Vue2.config.devtools = false
    install(Vue2) // install vue composition-api
  }
}

setupVueSwitch()

beforeAll(() => {
  setupVueSwitch()
})

beforeEach(() => {
  document.body.innerHTML = ''
  document.head.innerHTML = ''
})
