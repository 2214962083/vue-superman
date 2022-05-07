import * as monaco from 'monaco-editor'
import {emmetHTML} from 'emmet-monaco-es'
import runtimeTypes from './runtime.d.ts?raw'
import vueTypes from 'vue/dist/vue.d.ts?raw'
import vueSharedTypes from '@vue/shared/dist/shared.d.ts?raw'
import vueRuntimeDomTypes from '@vue/runtime-dom/dist/runtime-dom.d.ts?raw'
import vueRuntimeCoreTypes from '@vue/runtime-core/dist/runtime-core.d.ts?raw'
import vueReactivityTypes from '@vue/reactivity/dist/reactivity.d.ts?raw'

interface TsLib {
  content: string
  filePath?: string
}

export function setLanguage() {
  monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
    ...monaco.languages.typescript.typescriptDefaults.getCompilerOptions(),
    target: monaco.languages.typescript.ScriptTarget.Latest,
    allowNonTsExtensions: true,
    moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
    module: monaco.languages.typescript.ModuleKind.ESNext,
    noEmit: true,
    esModuleInterop: true,
    jsx: monaco.languages.typescript.JsxEmit.Preserve,
    allowJs: true,
    skipLibCheck: true,
    emitDecoratorMetadata: true,
    resolveJsonModule: true,
    allowSyntheticDefaultImports: true,
    experimentalDecorators: true,
    noUnusedLocals: false,
    noUnusedParameters: false,
    allowUnreachableCode: true,
    allowUnusedLabels: true,
    strict: false,
    typeRoots: ['node_modules/@types']
  })

  monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
    noSemanticValidation: false,
    noSyntaxValidation: false,
    // Ignore unused variable warnings
    diagnosticCodesToIgnore: [6133, 6198, 8006, 8010]
  })

  const tsLibs: TsLib[] = [
    {content: runtimeTypes},
    {content: `declare module '@vue/shared' { ${vueSharedTypes} }`},
    {content: `declare module '@vue/runtime-core' { ${vueRuntimeCoreTypes} }`},
    {content: `declare module '@vue/runtime-dom' { ${vueRuntimeDomTypes} }`},
    {content: `declare module '@vue/reactivity' { ${vueReactivityTypes} }`},
    {content: `declare module 'vue' { ${vueTypes} }`}
  ]

  tsLibs.forEach(lib => {
    monaco.languages.typescript.typescriptDefaults.addExtraLib(lib.content, lib.filePath)
  })

  // suggestions
  monaco.languages.registerCompletionItemProvider('html', {
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

  // support emmet
  emmetHTML(monaco)
}
