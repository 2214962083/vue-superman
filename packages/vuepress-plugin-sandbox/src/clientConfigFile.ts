/* eslint-disable @typescript-eslint/no-explicit-any */
import {defineClientConfig} from '@vuepress/client'
import {ConcreteComponent, DefineComponent, h, resolveComponent} from 'vue'
import * as base64 from 'js-base64'
import {SANDBOX_COMPONENT_NAME} from './constants'
import 'vue-playground/dist/style.css'

export default defineClientConfig({
  async enhance({app}) {
    let Playground: DefineComponent<{}, {}, any> | undefined

    if (!__VUEPRESS_SSR__) {
      // load playground
      const VuePlayground = await import('vue-playground')
      Playground = VuePlayground.Playground

      // set global css
      const styleEl = document.createElement('style')
      styleEl.innerHTML = `
      .demo-container {
        margin-top: 1rem;
        margin-bottom: 1rem;
      }
      .demo-container + .demo-container {
        margin-top: 3rem;
      }
    `
      document.head.appendChild(styleEl)
    }
    // wrap the component with default options
    app.component(SANDBOX_COMPONENT_NAME, defaultProps => {
      if (!Playground) return null
      const ClientOnly = resolveComponent('ClientOnly')
      const playgroundOptions = self?.loadSandbox?.(defaultProps) || defaultProps

      return h(ClientOnly, {}, () =>
        h(Playground as ConcreteComponent, {
          ...playgroundOptions
        })
      )
    })

    app.config.globalProperties.base64 = base64 // decode the options in sandbox component
  }
})
