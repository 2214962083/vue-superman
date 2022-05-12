/* eslint-disable @typescript-eslint/no-explicit-any */
import {defineClientAppEnhance} from '@vuepress/client'
import {ConcreteComponent, DefineComponent, h, resolveComponent} from 'vue'
import * as base64 from 'js-base64'
import {SANDBOX_COMPONENT_NAME} from './constants'
import css from '../node_modules/vue-playground/dist/style.css'

export default defineClientAppEnhance(async ({app}) => {
  let Playground: DefineComponent<{}, {}, any> | undefined

  if (!__VUEPRESS_SSR__) {
    // add playground styles to global
    const styleEl = document.createElement('style')
    styleEl.innerHTML = css
    document.head.appendChild(styleEl)

    // load playground
    const VuePlayground = await import('vue-playground')
    Playground = VuePlayground.Playground
  }
  // wrap the component with default options
  app.component(SANDBOX_COMPONENT_NAME, defaultProps => {
    if (!Playground) return null
    const ClientOnly = resolveComponent('ClientOnly')
    const playgroundOptions = self?.loadSandbox?.(defaultProps?.options) || defaultProps?.options

    return h(ClientOnly, {}, () =>
      h(Playground as ConcreteComponent, {
        ...defaultProps,
        options: playgroundOptions
      })
    )
  })

  app.config.globalProperties.base64 = base64 // decode the options in sandbox component
})
