# Example

## Base

```vue
<script lang="ts" setup>
import Playground, {File, PlaygroundOptions} from 'vue-playground'

const AppFile = new File(
  'App.vue',
  `
<template>
  {{1 + 2}}
</template>`
)

const playgroundProps: PlaygroundOptions = {
  title: 'My demo',
  files: [AppFile],
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
</script>
<template>
  <playground v-bind="playgroundProps"></playground>
</template>
```

<script lang="ts" setup>
import {File, PlaygroundOptions} from 'vue-playground'

const AppFile = new File(
  'App.vue',`
<template>
  Hello {{1 + 2}}
</template>`
)

const playgroundProps: PlaygroundOptions = {
  title: 'My demo',
  files: [AppFile],
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
</script>

<ClientOnly>
  <playground v-bind="playgroundProps"></playground>
</ClientOnly>
