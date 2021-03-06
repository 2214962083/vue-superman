/* eslint-disable @typescript-eslint/no-explicit-any */
import {Store} from '../store'
import {PreviewProxy} from './preview-proxy'
import PreviewIframe from './preview-iframe.html?raw'
import {compileModulesForPreview} from './module-compiler'
import {DEFAULT_ES_MODULE_SHIMS_CDN} from '../../playground/constants'
import type {PlaygroundPkgCdn} from '../../playground/utils/types-helper'

export interface PreviewOptions {
  pkgCdn?: PlaygroundPkgCdn
  store: Store
  onBeforeDestroy?: () => void
  onBeforeLoad?: () => void
  onLoad?: () => void
  onWarning?: (msg: string) => void
  onError?: (errorMsg: string) => void
}

export class Preview {
  sandboxEl?: HTMLIFrameElement
  previewProxy?: PreviewProxy
  store!: Store
  pkgCdn?: PlaygroundPkgCdn
  onBeforeDestroy?: () => void
  onBeforeLoad?: () => void
  onLoad?: () => void
  onWarning?: (msg: string) => void
  onError?: (errorMsg: string) => void

  constructor(options: PreviewOptions) {
    this.store = options.store
    this.pkgCdn = options.pkgCdn
    this.onBeforeDestroy = options.onBeforeDestroy
    this.onBeforeLoad = options.onBeforeLoad
    this.onLoad = options.onLoad
    this.onError = options.onError
  }

  destroy() {
    this.onBeforeDestroy?.()
    this.previewProxy?.destroy()
    this.sandboxEl?.remove()
  }

  createSandbox(container: HTMLElement) {
    if (this.sandboxEl) this.destroy()
    this.onBeforeLoad?.()

    this.sandboxEl = document.createElement('iframe')
    this.sandboxEl.setAttribute(
      'sandbox',
      [
        'allow-forms',
        'allow-modals',
        'allow-pointer-lock',
        'allow-popups',
        'allow-same-origin',
        'allow-scripts',
        'allow-top-navigation-by-user-activation'
      ].join(' ')
    )

    const importMap = this.store.getImportMap()
    if (!importMap.imports) importMap.imports = {}
    if (!importMap.imports.vue) importMap.imports.vue = this.store.state.vueRuntimeURL

    this.sandboxEl.srcdoc = PreviewIframe.replace(/<!--IMPORT_MAP-->/, JSON.stringify(importMap)) // inject import map
      .replace(
        /<!--ES_MODULE_SHIMS_CDN-->/,
        this.pkgCdn?.['es-module-shims']?.('0.10.1', '/dist/es-module-shims.min.js') || DEFAULT_ES_MODULE_SHIMS_CDN
      ) // inject es module shims

    container.appendChild(this.sandboxEl)

    this.previewProxy = new PreviewProxy({
      iframe: this.sandboxEl,
      handler: {
        onError: (event: any) => {
          const msg = event.value instanceof Error ? event.value.message : event.value
          if (msg.includes('Failed to resolve module specifier') || msg.includes('Error resolving module specifier')) {
            const _msg =
              msg.replace(/\. Relative references must.*$/, '') +
              `.\nTip: add an "import-map.json" file to specify import paths for dependencies.`
            this.onError?.(_msg)
          } else {
            this.onError?.(String(event.value))
          }
        },
        onUnhandledRejection: (event: any) => {
          let error = event.value
          if (typeof error === 'string') error = {message: error}
          this.onError?.('Uncaught (in promise): ' + error.message)
        },
        onConsole: (log: any) => {
          if (log.duplicate) return
          let msg = null
          if (log.level === 'error') {
            if (log.args[0] instanceof Error) {
              msg = log.args[0].message
            } else {
              msg = log.args[0]
            }
          } else if (log.level === 'warn') {
            if (log.args[0].toString().includes('[Vue warn]')) {
              this.onWarning?.(
                log.args
                  .join('')
                  .replace(/\[Vue warn\]:/, '')
                  .trim()
              )
            }
          }
          if (msg) this.onError?.(msg)
        }
      }
    })

    this.sandboxEl.addEventListener('load', () => {
      this.previewProxy?.catchClicks()
      this.onLoad?.()
    })
  }

  async updateSandbox() {
    try {
      // compile code to simulated module system
      const modules = compileModulesForPreview(this.store)
      console.log(`[@vue/repl] successfully compiled ${modules.length} modules.`)

      const codeToEval = [
        `window.__modules__ = {};window.__css__ = '';` +
          `if (window.__app__) window.__app__.unmount();` +
          `document.body.innerHTML = '<div id="app"></div>'`,
        ...modules,
        `document.getElementById('__sfc-styles').innerHTML = window.__css__`
      ]

      // if main file is a vue file, mount it.
      const mainFile = this.store.state.mainFile
      if (mainFile.endsWith('.vue')) {
        codeToEval.push(
          `import { createApp as _createApp } from "vue"
          const AppComponent = __modules__["${mainFile}"].default
          const app = window.__app__ = _createApp(AppComponent)
          app.config.unwrapInjectedRef = true
          app.config.errorHandler = e => console.error(e)
          app.mount('#app')`.trim()
        )
      }

      // eval code in sandbox
      await this.previewProxy?.eval(codeToEval)
    } catch (e) {
      this.onError?.((e as Error).message)
    }
  }
}
