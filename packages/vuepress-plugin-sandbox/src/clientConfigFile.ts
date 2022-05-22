/* eslint-disable @typescript-eslint/no-explicit-any */
import {defineClientConfig} from '@vuepress/client'
import {ConcreteComponent, DefineComponent, h, provide, ref, resolveComponent} from 'vue'
import * as base64 from 'js-base64'
import {SANDBOX_COMPONENT_NAME} from './constants'
import 'vue-playground/dist/style.css'
import {useMutationObserver} from '@vueuse/core'
import {SHOW_DARK_MODE_INJECT_KEY} from 'vue-playground'

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
  },
  setup() {
    if (!__VUEPRESS_SSR__) {
      const html = document.documentElement
      const sandboxDark = ref(false)

      // watch vuepress dark mode
      useMutationObserver(
        html,
        mutations => {
          if (mutations.every(m => m.attributeName !== 'class')) return
          const isVuepressDark = Boolean(html.classList.contains('dark'))
          sandboxDark.value = isVuepressDark
        },
        {
          attributes: true
        }
      )

      // set all sandbox dark mode
      provide(SHOW_DARK_MODE_INJECT_KEY, sandboxDark)
    }
  }
})
