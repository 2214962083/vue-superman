# Configuration

## Props

```ts
/**
 * This is the props type
 */
interface PlaygroundOptions {
  /**
   * Title for toolbar
   */
  title?: string

  /**
   * Files for editor
   */
  files?: File[]

  /**
   * Lifecycle hooks
   */
  lifeCycle?: PlaygroundLifeCycle

  /**
   * Themes configs list (light theme and dark theme)
   */
  themes?: PlaygroundThemes

  /**
   * Import map
   */
  importMap?: ImportMap

  /**
   * Modify the cdn of the built-in package
   */
  pkgCdn?: PlaygroundPkgCdn
}
```

Example:

```vue
<script setup lang="ts">
import {PlaygroundOptions} from 'vue-playground'
const options: PlaygroundOptions = {
  title: 'My demo',
  files: []
}
</script>
<template>
  <vue-playground v-bind="options" />
</template>
```

## File

```ts
/**
 * File class for editor
 */
class File {
  /**
   * File name
   */
  filename: string

  /**
   * File content
   */
  code: string

  /**
   * Whether to hide
   */
  hidden: boolean

  /**
   * Save compilation result
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

Example:

```ts
import {File} from 'vue-playground'
const file = new File('test.ts', 'console.log("aaa")')
```

## Lifecycle hooks

```ts
interface PlaygroundLifeCycle {
  /**
   * This function will be executed before monaco is loaded
   */
  beforeLoadMonaco?: () => MaybePromise<void>

  /**
   * This function will be executed after monaco is loaded
   * @param monaco monaco object
   */
  afterLoadMonaco?: (monaco: Monaco) => MaybePromise<void>

  /**
   * Intercept loading of tsconfig
   * @param monaco monaco object
   * @param defaultTsconfig default tsconfig
   * @returns need to return a tsconfig
   */
  loadTsconfig?: (monaco: Monaco, defaultTsconfig: Tsconfig) => MaybePromise<Tsconfig>

  /**
   * Intercept the list of loaded dts files
   * @param monaco monaco object
   * @param defaultDtsFiles default dts file list
   * @returns need to return a list of dts files
   */
  loadTsLibs?: (monaco: Monaco, defaultTsLibs: TsLib[]) => MaybePromise<TsLib[]>

  /**
   * This function will be executed after monaco has set the language
   * @param monaco monaco object
   */
  afterSetLanguage?: (monaco: Monaco) => MaybePromise<void>

  /**
   * Intercept the loading of monaco worker (you need to manually load the worker here)
   * @param monaco monaco object
   * @param self window where monaco is located
   */
  loadWorkers?: (monaco: Monaco, self: Window) => MaybePromise<void>

  /**
   * This function is executed before the monaco editor is instantiated
   * @param monaco monaco object
   */
  beforeCreateEditor?: (monaco: Monaco) => MaybePromise<void>

  /**
   * Intercept loading monaco editor instantiation construction parameters
   * @param monaco monaco object
   * @param defaultOptions default monaco editor constructor parameters
   * @returns need to return monaco editor constructor parameter
   */
  loadEditorOption?: (monaco: Monaco, defaultOptions: CreateEditorOptions) => MaybePromise<CreateEditorOptions>

  /**
   * This function is executed after the monaco editor is instantiated
   * @param monaco monaco object
   * @param editor monaco editor instance
   */
  afterCreateEditor?: (monaco: Monaco, editor: IStandaloneCodeEditor) => MaybePromise<void>

  /**
   * This function will be executed after the file code is changed
   * @param event.activeFile the currently edited file instance
   * @param event.newCode the currently edited file code
   */
  onCodeChange?: (event: {activeFile: File; newCode: string}) => MaybePromise<void>

  /**
   * This function will be executed before the monaco editor is destroyed
   * @param monaco monaco object
   * @param editor monaco editor instance
   */
  beforeDestroyEditor?: (monaco: Monaco, editor: IStandaloneCodeEditor) => MaybePromise<void>

  /**
   * This function will be executed after the monaco editor is destroyed
   * @param monaco monaco object
   */
  afterDestroyEditor?: (monaco: Monaco) => MaybePromise<void>

  /**
   * This function will be executed when the dark mode is changed
   * @param darkMode whether the current monaco editor is in dark mode
   */
  onDarkModeChange?: (darkMode: boolean) => MaybePromise<void>
}
```

Example:

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

## Theme

```ts
interface PlaygroundTheme {
  /**
   * monaco editor theme name, several built-in
   * 'vitesse-light': default light theme
   * 'vitesse-dark': default dark theme
   * 'vs': vscode light theme
   * 'vs-dark': vscode dark theme
   */
  '--editor-theme-name'?: string

  /**
   * theme color
   */
  '--theme-color'?: string

  /**
   * border color
   */
  '--border-color'?: string

  /**
   * background color
   */
  '--bg-color'?: string

  /**
   * toolbar title color
   */
  '--toolbar-title-color'?: string

  /**
   * toolbar background color
   */
  '--toolbar-bg-color'?: string

  /**
   * toolbar text color
   */
  '--toolbar-text-color'?: string

  /**
   * toolbar icon background color
   */
  '--toolbar-icon-bg-color'?: string

  /**
   * toolbar icon color
   */
  '--toolbar-icon-color'?: string

  /**
   * the color of the toolbar icon when it is active
   */
  '--toolbar-icon-active-color'?: string

  /**
   * preview area background color
   */
  '--preview-bg-color'?: string

  /**
   * preview area text color
   */
  '--preview-text-color'?: string

  /**
   * file management bar background color
   */
  '--file-manager-bg-color'?: string

  /**
   * file management bar text color
   */
  '--file-manager-text-color'?: string

  /**
   * the background color of the active file in the file management bar
   */
  '--file-manager-active-bg-color'?: string

  /**
   * the text color of the active file in the file management bar
   */
  '--file-manager-active-text-color'?: string

  /**
   * the background of the import map on the right side of the file management bar
   */
  '--file-manager-right-float-bg'?: string

  /**
   * warning message text color
   */
  '--message-warn-text-color'?: string

  /**
   * warning message background color
   */
  '--message-warn-bg-color'?: string

  /**
   * warning message border color
   */
  '--message-warn-border-color'?: string

  /**
   * error message text color
   */
  '--message-error-text-color'?: string

  /**
   * error message background color
   */
  '--message-error-bg-color'?: string

  /**
   * error message border color
   */
  '--message-error-border-color'?: string

  /**
   * close button text color for messages
   */
  '--message-dismiss-text-color'?: string

  /**
   * close button background color for messages
   */
  '--message-dismiss-bg-color'?: string
}

interface PlaygroundThemes {
  /**
   * light theme
   */
  light?: PlaygroundTheme

  /**
   * dark theme
   */
  dark?: PlaygroundTheme
}
```

Example:

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

## Import map

```ts
interface ImportMap {
  imports: Record<string, string>
}
```

Example:

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

## Cdn overlay for builtin packages

```ts
interface PlaygroundPkgCdn {
  '@vue/runtime-dom'?: (version: string, ending: string) => string
  '@vue/compiler-sfc'?: (version: string, ending: string) => string
  'es-module-shims'?: (version: string, ending: string) => string
}
```

Example:

```ts
import {PlaygroundPkgCdn} from 'vue-playground'

const pkgCdn: PlaygroundPkgCdn = {
  '@vue/runtime-dom'(version) {
    return `https://unpkg.com/vue@${version}/dist/vue.esm-browser.js`
  }
}
```
