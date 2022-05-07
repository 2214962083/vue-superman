/* eslint-disable @typescript-eslint/no-explicit-any */
import {VUE_PLAYGROUND_NAME} from './constants'
import {defineClientAppEnhance} from '@vuepress/client'
import {DefineComponent, h, resolveComponent} from 'vue'
import * as base64 from 'js-base64'

export default defineClientAppEnhance(async ({app}) => {
  let Playground: DefineComponent<{}, {}, any> | undefined

  if (!__VUEPRESS_SSR__) {
    Playground = (await import('../client/playground/playground.vue')).default
  }
  // wrap the component with default options
  app.component(VUE_PLAYGROUND_NAME, props => {
    if (!Playground) return null
    const ClientOnly = resolveComponent('ClientOnly')
    return h(ClientOnly, h(Playground, {...props}))
  })
  app.config.globalProperties.base64 = base64
})
