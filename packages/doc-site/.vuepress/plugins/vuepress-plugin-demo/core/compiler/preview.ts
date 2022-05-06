import {Store} from '../store'
import {PreviewProxy} from './preview-proxy'
import PreviewIframe from './preview-iframe.html?raw'
import {compileModulesForPreview} from './module-compiler'

export interface PreviewOptions {
  store: Store
  onBeforeDestroy?: () => void
  onLoad?: () => void
  onError?: (errorMsg: string) => void
}

export class Preview {
  sandboxEl?: HTMLIFrameElement
  previewProxy?: PreviewProxy
  store!: Store
  onBeforeDestroy?: () => void
  onLoad?: () => void
  onError?: (errorMsg: string) => void

  constructor(options: PreviewOptions) {
    this.store = options.store
    this.onBeforeDestroy = options.onBeforeDestroy
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

    this.sandboxEl.srcdoc = PreviewIframe.replace(/<!--IMPORT_MAP-->/, JSON.stringify(importMap))
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
              msg = log.args
                .join('')
                .replace(/\[Vue warn\]:/, '')
                .trim()
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
          AppComponent.name = 'Repl'
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
