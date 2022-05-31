/* eslint-disable @typescript-eslint/no-explicit-any */
import type {Monaco, CustomMonacoLanguage} from '@/playground/utils/types-helper'
import type {IGrammarDefinition} from 'monaco-textmate'

function isSameSource(my: string, target: string) {
  const myExt = my.startsWith('source') ? my.split('.').pop() : my
  const targetExt = target.startsWith('source') ? target.split('.').pop() : target
  return myExt === targetExt
}

export async function registerLanguagesForMonaco(options: {
  monaco: Monaco
  customLangs: CustomMonacoLanguage[]
  onigWasmUrl: string
}) {
  const {monaco, customLangs, onigWasmUrl} = options

  const {loadWASM} = await import('onigasm')
  const {Registry} = await import('monaco-textmate')
  const {wireTmGrammars} = await import('monaco-editor-textmate')

  const response = await (await fetch(onigWasmUrl)).arrayBuffer()
  await loadWASM(response)

  const registry = new Registry({
    getGrammarDefinition: async (scopeName): Promise<IGrammarDefinition> => {
      let targetLang = customLangs.find(item => isSameSource(item.sourceName, scopeName))

      if (!targetLang) {
        targetLang = customLangs.find(item => isSameSource(item.sourceName, 'source.tsx'))!
      }

      const remoteGrammar = await targetLang.loadGrammar()
      const grammar = {
        ...JSON.parse(JSON.stringify(remoteGrammar)), // Prevent incoming objects from being frozen
        name: targetLang.id,
        scopeName
      }

      // console.log('fetchGrammar grammar', scopeName, grammar, targetLang)
      const textMateGrammar: IGrammarDefinition = {
        format: targetLang.grammarType,
        content: grammar
      }

      return textMateGrammar
    }
  })

  const grammars = new Map()
  const promises = customLangs.map(async item => {
    grammars.set(item.id, item.sourceName)

    monaco.languages.register({
      id: item.id,
      ...item.lang
    })

    const configuration = await item.loadConfiguration?.()
    // console.log('loadConfiguration', item.id, configuration)
    if (configuration) {
      monaco.languages.setLanguageConfiguration(
        item.id,
        JSON.parse(JSON.stringify(configuration)) // Prevent incoming objects from being frozen
      )
    }
  })

  await Promise.allSettled(promises)

  // wireTmGrammars only cares about the language part, but asks for all of monaco
  // we fool it by just passing in an object with languages
  await wireTmGrammars({languages: monaco.languages} as any, registry, grammars)
}
