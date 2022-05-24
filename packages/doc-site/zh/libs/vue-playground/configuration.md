# 配置

## Props

```ts
/**
 * 这是 props 类型
 */
interface PlaygroundOptions {
  /**
   * 标题
   */
  title?: string

  /**
   * 文件列表
   */
  files?: File[]

  /**
   * 生民周期钩子
   */
  lifeCycle?: PlaygroundLifeCycle

  /**
   * 主题列表
   */
  themes?: PlaygroundThemes

  /**
   * import 映射
   */
  importMap?: ImportMap

  /**
   * 修改内置包的 cdn
   */
  pkgCdn?: PlaygroundPkgCdn
}
```

示例:

```vue
<script setup lang="ts">
import {PlaygroundOptions} from 'vue-playground'
const options: PlaygroundOptions = {
  title: '我的 demo',
  files: []
}
</script>
<template>
  <vue-playground v-bind="options" />
</template>
```

## 文件类

```ts
/**
 * 文件类
 */
class File {
  /**
   * 文件名
   */
  filename: string

  /**
   * 文件内容
   */
  code: string

  /**
   * 是否隐藏
   */
  hidden: boolean

  /**
   * 储存编译结果
   */
  compiled = {
    js: '',
    css: '',
    ssr: ''
  }

  constructor(filename: string, code = '', hidden = false) {
    this.filename = filename
    this.code = code
    this.hidden = hidden
  }
}
```

示例:

```ts
import {File} from 'vue-playground'
const file = new File('test.ts', 'console.log("aaa")')
```

## 生命周期钩子

```ts
interface PlaygroundLifeCycle {
  /**
   * monaco 加载之前会执这个函数
   */
  beforeLoadMonaco?: () => MaybePromise<void>

  /**
   * monaco 加载之后会执这个函数
   * @param monaco monaco 对象
   */
  afterLoadMonaco?: (monaco: Monaco) => MaybePromise<void>

  /**
   * 拦截加载 tsconfig
   * @parma monaco monaco 对象
   * @parma defaultTsconfig 默认 tsconfig
   * @returns 需要返回一个 tsconfig
   */
  loadTsconfig?: (monaco: Monaco, defaultTsconfig: Tsconfig) => MaybePromise<Tsconfig>

  /**
   * 拦截加载 dts 文件列表
   * @parma monaco monaco 对象
   * @parma defaultDtsFiles 默认 dts 文件列表
   * @returns 需要返回一个 dts 文件列表
   */
  loadTsLibs?: (monaco: Monaco, defaultTsLibs: TsLib[]) => MaybePromise<TsLib[]>

  /**
   * 在 monaco 设置完 language 之后会执行这个函数
   * @param monaco monaco 对象
   */
  afterSetLanguage?: (monaco: Monaco) => MaybePromise<void>

  /**
   * 拦截加载 monaco worker（需要在这里面自己手动加载 worker）
   * @parma monaco monaco 对象
   * @parma self monaco 所处的 window
   */
  loadWorkers?: (monaco: Monaco, self: Window) => MaybePromise<void>

  /**
   * 在 monaco editor 实例化之前会执行这个函数
   * @param monaco monaco 对象
   */
  beforeCreateEditor?: (monaco: Monaco) => MaybePromise<void>

  /**
   * 拦截加载 monaco editor 实例化构造参数
   * @param monaco monaco 对象
   * @param defaultOptions 默认 monaco editor 构造参数
   * @returns 需要返回 monaco editor 构造参数
   */
  loadEditorOption?: (monaco: Monaco, defaultOptions: CreateEditorOptions) => MaybePromise<CreateEditorOptions>

  /**
   * 在 monaco editor 实例化之后会执行这个函数
   * @param monaco monaco 对象
   * @param editor monaco editor 实例化对象
   */
  afterCreateEditor?: (monaco: Monaco, editor: IStandaloneCodeEditor) => MaybePromise<void>

  /**
   * 文件代码编辑后会执行这个函数
   * @param event.activeFile 当前编辑的文件对象
   * @param event.newCode 当前编辑的文件代码
   */
  onCodeChange?: (event: {activeFile: File; newCode: string}) => MaybePromise<void>

  /**
   * monaco editor 销毁之前会执行这个函数
   * @param monaco monaco 对象
   * @param editor monaco editor 实例化对象
   */
  beforeDestroyEditor?: (monaco: Monaco, editor: IStandaloneCodeEditor) => MaybePromise<void>

  /**
   * monaco editor 销毁之后会执行这个函数
   * @param monaco monaco 对象
   */
  afterDestroyEditor?: (monaco: Monaco) => MaybePromise<void>

  /**
   * 暗黑模式变更时会执行这个函数
   * @param darkMode 当前 monaco editor 是否为暗黑模式
   */
  onDarkModeChange?: (darkMode: boolean) => MaybePromise<void>
}
```

示例:

```ts
import {PlaygroundLifeCycle} from 'vue-playground'
import vueXrenderTypes from 'vue-xrender/dist/index.d.ts?raw'
import classMockTypes from 'class-mock/dist/index.d.ts?raw'

const lifeCycle: PlaygroundLifeCycle = {
  loadTsLibs(monaco, defaultTsLibs) {
    const tsLibs = [
      {content: `declare module 'vue-xrender' { ${vueXrenderTypes} }`},
      {content: `declare module 'class-mock' { ${classMockTypes} }`}
    ]
    return [...defaultTsLibs, ...tsLibs]
  },
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
```

## 主题定制

```ts
interface PlaygroundTheme {
  /**
   * monaco editor 主题名字，内置几个
   * 'vitesse-light': 默认白色主题
   * 'vitesse-dark': 默认黑色主题
   * 'vs': vscode 白色主题
   * 'vs-dark': vscode 暗黑主题
   */
  '--editor-theme-name'?: string

  /**
   * 主题颜色
   */
  '--theme-color'?: string

  /**
   * 边框颜色
   */
  '--border-color'?: string

  /**
   * 背景颜色
   */
  '--bg-color'?: string

  /**
   * 工具栏标题颜色
   */
  '--toolbar-title-color'?: string

  /**
   * 工具栏背景颜色
   */
  '--toolbar-bg-color'?: string

  /**
   * 工具栏文字颜色
   */
  '--toolbar-text-color'?: string

  /**
   * 工具栏 icon 背景颜色
   */
  '--toolbar-icon-bg-color'?: string

  /**
   * 工具栏 icon 颜色
   */
  '--toolbar-icon-color'?: string

  /**
   * 工具栏 icon 聚焦时的颜色
   */
  '--toolbar-icon-active-color'?: string

  /**
   * 预览区域背景颜色
   */
  '--preview-bg-color'?: string

  /**
   * 预览区域文字颜色
   */
  '--preview-text-color'?: string

  /**
   * 文件管理条背景颜色
   */
  '--file-manager-bg-color'?: string

  /**
   * 文件管理条文字颜色
   */
  '--file-manager-text-color'?: string

  /**
   * 文件管理条聚焦的文件的背景颜色
   */
  '--file-manager-active-bg-color'?: string

  /**
   * 文件管理条聚焦的文件的文字颜色
   */
  '--file-manager-active-text-color'?: string

  /**
   * 文件管理条右边 import map 的背景
   */
  '--file-manager-right-float-bg'?: string

  /**
   * 编译警告信息文字颜色
   */
  '--message-warn-text-color'?: string

  /**
   * 编译警告信息背景颜色
   */
  '--message-warn-bg-color'?: string

  /**
   * 编译警告信息边框颜色
   */
  '--message-warn-border-color'?: string

  /**
   * 编译错误信息文字颜色
   */
  '--message-error-text-color'?: string

  /**
   * 编译错误信息背景颜色
   */
  '--message-error-bg-color'?: string

  /**
   * 编译错误信息边框颜色
   */
  '--message-error-border-color'?: string

  /**
   * 编译警告错误信息的 close 按钮颜色
   */
  '--message-dismiss-text-color'?: string

  /**
   * 编译警告错误信息的 close 按钮背景颜色
   */
  '--message-dismiss-bg-color'?: string
}

interface PlaygroundThemes {
  /**
   * 白色主题
   */
  light?: PlaygroundTheme

  /**
   * 黑色主题
   */
  dark?: PlaygroundTheme
}
```

示例:

```ts
import {PlaygroundThemes} from 'vue-playground'

const themes: PlaygroundThemes = {
  light: {
    '--theme-color': '#ff7299',
    '--editor-theme-name': 'vs'
  },
  dark: {
    '--theme-color': '#ff7299',
    '--editor-theme-name': 'vs-dark'
  }
}
```

## 包映射

```ts
interface ImportMap {
  imports: Record<string, string>
}
```

示例:

```ts
import {ImportMap} from 'vue-playground'

const getPkgUrl = (name: string, version = 'latest', ending = '') => `https://unpkg.com/${name}@${version}${ending}`

const importMap: ImportMap = {
  imports: {
    'vue-xrender': getPkgUrl('vue-xrender', pkg.version, '/dist/index.mjs'),
    'class-mock': getPkgUrl('class-mock', pkg.version, '/dist/index.mjs')
  }
}
```

## 内置包的 cdn 覆盖

```ts
interface PlaygroundPkgCdn {
  '@vue/runtime-dom'?: (version: string, ending: string) => string
  '@vue/compiler-sfc'?: (version: string, ending: string) => string
  'es-module-shims'?: (version: string, ending: string) => string
}
```

示例:

```ts
import {PlaygroundPkgCdn} from 'vue-playground'

const pkgCdn: PlaygroundPkgCdn = {
  '@vue/runtime-dom'(version) {
    return `https://unpkg.com/vue@${version}/dist/vue.esm-browser.js`
  }
}
```
