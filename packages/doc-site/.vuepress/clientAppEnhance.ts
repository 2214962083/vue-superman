import {defineClientAppEnhance} from '@vuepress/client'
import {configLoadSandbox} from 'vuepress-plugin-sandbox/client'

export default defineClientAppEnhance(() => {
  configLoadSandbox(preOptions => {
    return {
      ...preOptions,
      lifeCycle: {
        loadWorkers: async () => {
          await Promise.all([
            // load workers
            (async () => {
              const [
                {default: EditorWorker},
                {default: JsonWorker},
                {default: HtmlWorker},
                {default: TsWorker},
                {default: CssWorker}
              ] = await Promise.all([
                import('monaco-editor/esm/vs/editor/editor.worker?worker'),
                import('monaco-editor/esm/vs/language/json/json.worker?worker'),
                import('monaco-editor/esm/vs/language/html/html.worker?worker'),
                import('monaco-editor/esm/vs/language/typescript/ts.worker?worker'),
                import('monaco-editor/esm/vs/language/css/css.worker?worker')
              ])

              self.MonacoEnvironment = {
                getWorker: function (workerId, label) {
                  switch (label) {
                    case 'json':
                      return new JsonWorker()
                    case 'css':
                    case 'scss':
                    case 'less':
                      return new CssWorker()
                    case 'html':
                    case 'handlebars':
                    case 'razor':
                      return new HtmlWorker()
                    case 'typescript':
                    case 'javascript':
                      return new TsWorker()
                    default:
                      return new EditorWorker()
                  }
                }
              }
            })()
          ])
        }
      }
    }
  }, self)
})
