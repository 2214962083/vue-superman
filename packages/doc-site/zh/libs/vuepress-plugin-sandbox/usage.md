# 使用

默认将第一个文件作为初始视图渲染

**注意：import 文件的扩展不能省略**

````md
::: demo 我的 Demo

```vue App.vue
<template>
  <div>
    <div @click="increment">count: {{ count }}</div>
    <div>{{ introduction }}</div>
  </div>
</template>
<script lang="ts" setup>
import {ref, computed} from 'vue'
import {myName} from './constants.ts'

const count = ref(0)
const increment = () => {
  count.value++
}
const introduction = computed(() => `Hello, i am ${myName}!`)
</script>
```

```ts constants.ts
export const myName = 'xiao ming'
```

:::
````

上面的渲染结果为：

::: demo 我的 Demo

```vue App.vue
<template>
  <div>
    <div @click="increment">count: {{ count }}</div>
    <div>{{ introduction }}</div>
  </div>
</template>
<script lang="ts" setup>
import {ref, computed} from 'vue'
import {myName} from './constants.ts'

const count = ref(0)
const increment = () => {
  count.value++
}
const introduction = computed(() => `Hello, i am ${myName}!`)
</script>
```

```ts constants.ts
export const myName = 'xiao ming'
```

:::

## 配置

插件实例化配置

```ts
interface SandboxOptions {
  /**
   * demo 标语，即 ::: demo
   * @default 'demo'
   */
  demoCodeMark?: string

  /**
   * 默认 vue-playground title
   */
  defaultDescription?: string

  /**
   * vue-playground 包映射
   */
  importMap?: ImportMap

  /**
   * vue-playground 主题配置
   */
  themes?: PlaygroundThemes
}

const sandboxPlugin = (options?: SandboxOptions) => VuepressPlugin
export default sandboxPlugin
```

### 包映射

`importMap` 请参考 [vue-playground 的包映射](../vue-playground/configuration.html#包映射)

### 主题定制

`themes` 请参考 [vue-playground 的主题定制](../vue-playground/configuration.html#主题定制)

### 示例

在 `vuepress.config.ts` 里的 `plugin` 配置里添加:

```ts
import {defineUserConfig} from 'vuepress'
import sandboxPlugin from 'vuepress-plugin-sandbox'

const getPkgUrl = (name: string, version = 'latest', ending = '') => `https://unpkg.com/${name}@${version}${ending}`

export default defineUserConfig({
  // ....
  plugins: [
    sandboxPlugin({
      importMap: {
        imports: {
          'vue-xrender': getPkgUrl('vue-xrender', pkg.version, '/dist/index.mjs'),
          'class-mock': getPkgUrl('class-mock', pkg.version, '/dist/index.mjs')
        }
      }
    })
  ]
})
```

## 覆盖 vue-playground props

```ts
import type {PlaygroundOptions} from 'vue-playground'

/**
 * 获取最终的 vue-playground props
 * @param preOptions vue-playground 旧的 props
 * @returns 必须返回最终的 vue-playground props
 */
export type LoadSandbox = (preOptions: PlaygroundOptions) => PlaygroundOptions

/**
 * 配置覆盖 vue-playground props
 * @param loadSandbox 获取最终的 vue-playground props 函数
 * @param _window 当前 window 对象
 */
export function configLoadSandbox(loadSandbox: LoadSandbox, _window: Window = self): void
```

### Props

请参考 [vue-playground 的 props](../vue-playground/configuration.html#props)

### 示例

在 `.vuepress` 文件夹下新建一个 `client.ts`

```ts
import {defineClientConfig} from '@vuepress/client'
import {configLoadSandbox} from 'vuepress-plugin-sandbox/client'

// 你的包的类型文件内容
// 此处的引入方式为 vite raw 引入
// webpack 要配合 raw-loader 引入
import vueXrenderTypes from 'vue-xrender/dist/index.d.ts?raw'
import classMockTypes from 'class-mock/dist/index.d.ts?raw'

export default defineClientConfig({
  async enhance() {
    if (!__VUEPRESS_SSR__) {
      // 非 ssr 模式下才加载
      configLoadSandbox(preOptions => {
        return {
          ...preOptions, // 旧的配置
          pkgCdn: {
            '@vue/runtime-dom'(version) {
              // 替换 @vue/runtime-dom 的版本
              return `https://unpkg.com/vue@${version}/dist/vue.esm-browser.js`
            }
          },
          lifeCycle: {
            loadTsLibs(_, defaultTsLibs) {
              // 加载 ts 类型文件（这里也可以像下面 worker 一样改成异步加载）
              const tsLibs = [
                {content: `declare module 'vue-xrender' { ${vueXrenderTypes} }`},
                {content: `declare module 'class-mock' { ${classMockTypes} }`}
              ]
              return [...defaultTsLibs, ...tsLibs]
            },
            loadWorkers: async () => {
              // 除了这个 loadWorkers 必须加载 worker，其他函数都可以不配置
              await Promise.all([
                // 异步加载 worker
                (async () => {
                  const [
                    {default: EditorWorker},
                    {default: JsonWorker},
                    {default: HtmlWorker},
                    {default: TsWorker},
                    {default: CssWorker}
                  ] = await Promise.all([
                    // 这个是 vite worker 引入方式
                    // webpack 要配合 worker-loader 引入
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
    }
  }
})
```
