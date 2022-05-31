/* eslint-disable @typescript-eslint/no-explicit-any */
import {FILE_BASE_URL} from '../constants'
import {Monaco, PlaygroundLifeCycle, Tsconfig, TsLib} from '../utils/types-helper'

export async function setLanguage(monaco: Monaco, lifeCycle?: PlaygroundLifeCycle) {
  const defaultTsconfig: Tsconfig = {
    ...monaco.languages.typescript.typescriptDefaults.getCompilerOptions(),
    target: monaco.languages.typescript.ScriptTarget.ESNext,
    baseUrl: FILE_BASE_URL,
    allowNonTsExtensions: true,
    moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
    module: monaco.languages.typescript.ModuleKind.ESNext,
    noEmit: true,
    esModuleInterop: true,
    jsx: monaco.languages.typescript.JsxEmit.Preserve,
    allowJs: true,
    skipLibCheck: true,
    noImplicitThis: true,
    emitDecoratorMetadata: true,
    resolveJsonModule: true,
    allowSyntheticDefaultImports: true,
    experimentalDecorators: true,
    noUnusedLocals: false,
    noUnusedParameters: false,
    noImplicitAny: false,
    allowUnreachableCode: true,
    allowUnusedLabels: true,
    suppressImplicitAnyIndexErrors: true,
    strict: false,
    typeRoots: ['node_modules/@types']
  }

  const tsconfig = (await lifeCycle?.loadTsconfig?.(monaco, defaultTsconfig)) || defaultTsconfig

  // ts
  monaco.languages.typescript.typescriptDefaults.setCompilerOptions(tsconfig)

  monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
    noSemanticValidation: false,
    noSyntaxValidation: false,
    // Ignore unused variable warnings
    diagnosticCodesToIgnore: [6133, 6198, 8006, 8010]
  })

  //js
  monaco.languages.typescript.javascriptDefaults.setCompilerOptions(tsconfig)

  monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
    noSemanticValidation: false,
    noSyntaxValidation: false
  })

  const [
    {default: vueTypes},
    {default: vueSharedTypes},
    {default: vueRuntimeDomTypes},
    {default: vueRuntimeCoreTypes},
    {default: vueReactivityTypes},
    {default: runtimeTypes}
  ] = await Promise.all([
    import('vue/dist/vue.d.ts?raw'),
    import('@vue/shared/dist/shared.d.ts?raw'),
    import('@vue/runtime-dom/dist/runtime-dom.d.ts?raw'),
    import('@vue/runtime-core/dist/runtime-core.d.ts?raw'),
    import('@vue/reactivity/dist/reactivity.d.ts?raw'),
    import('./runtime.d.ts?raw')
  ])

  const defaultTsLibs: TsLib[] = [
    {content: runtimeTypes},
    {content: `declare module '@vue/shared' { ${vueSharedTypes} }`},
    {content: `declare module '@vue/runtime-core' { ${vueRuntimeCoreTypes} }`},
    {content: `declare module '@vue/runtime-dom' { ${vueRuntimeDomTypes} }`},
    {content: `declare module '@vue/reactivity' { ${vueReactivityTypes} }`},
    {content: `declare module 'vue' { ${vueTypes} }`}
  ]

  const tsLibs = (await lifeCycle?.loadTsLibs?.(monaco, defaultTsLibs)) || defaultTsLibs

  tsLibs.forEach(lib => {
    monaco.languages.typescript.javascriptDefaults.addExtraLib(lib.content, lib.filePath)
    monaco.languages.typescript.typescriptDefaults.addExtraLib(lib.content, lib.filePath)
  })

  // suggestions
  ;['vue', 'html', 'vue-html'].map(() =>
    monaco.languages.registerCompletionItemProvider('vue', {
      triggerCharacters: ['>'],
      provideCompletionItems: (model, position) => {
        const codePre: string = model.getValueInRange({
          startLineNumber: position.lineNumber,
          startColumn: 1,
          endLineNumber: position.lineNumber,
          endColumn: position.column
        })

        const tag = codePre.match(/.*<(\w+)>$/)?.[1]

        if (!tag) return

        const word = model.getWordUntilPosition(position)

        return {
          suggestions: [
            {
              label: `</${tag}>`,
              kind: monaco.languages.CompletionItemKind.EnumMember,
              insertText: `</${tag}>`,
              range: {
                startLineNumber: position.lineNumber,
                endLineNumber: position.lineNumber,
                startColumn: word.startColumn,
                endColumn: word.endColumn
              }
            }
          ]
        }
      }
    })
  )

  // support emmet
  const {emmetHTML, emmetCSS} = await import('emmet-monaco-es')
  emmetHTML(monaco, ['html'])
  emmetCSS(monaco, ['css'])
}
