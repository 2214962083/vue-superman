/* eslint-disable @typescript-eslint/no-explicit-any */
// see: https://github.com/bolinfest/alt-esc-prototype/blob/main/src/TextMate.ts
import type {TextMateGrammar, ScopeNameInfo} from './providers'
import type {Monaco, CustomMonacoLanguage} from '@/playground/utils/types-helper'

import {registerLanguages, LanguageId} from './register'
import {rehydrateRegexps} from './configuration'
import darkTheme from 'theme-vitesse/themes/vitesse-dark.json'
import {convertTheme} from './convert-theme'

interface DemoScopeNameInfo extends ScopeNameInfo {
  path: string
}

export async function registerLanguagesForMonaco(options: {
  monaco: Monaco
  customLangs: CustomMonacoLanguage[]
  onigWasmUrl: string
}) {
  // const onigWasmUrlVersion = pkg.dependencies['vscode-oniguruma']
  // this.pkgCdn?.['vs']?.(onigWasmUrlVersion, '/release/onig.wasm') ||
  // DEFAULT_ONIGURUMA_WASM_CDN(onigWasmUrlVersion)
  const {monaco, customLangs, onigWasmUrl} = options

  const {createOnigScanner, createOnigString, loadWASM} = await import('vscode-oniguruma')
  const response = await fetch(onigWasmUrl)
  await loadWASM(response)

  const onigLib = Promise.resolve({
    createOnigScanner,
    createOnigString
  })

  const languages: monaco.languages.ILanguageExtensionPoint[] = customLangs.map(item => ({
    id: item.id,
    ...item.lang
  }))

  type CustomGrammars = {[scopeName: string]: DemoScopeNameInfo}
  const grammars: CustomGrammars = customLangs.reduce((result, item) => {
    result[item.sourceName] = {
      ...result[item.sourceName],
      language: item.id,
      path: item.tmLanguagePath
    }
    return result
  }, {} as CustomGrammars)

  async function fetchGrammar(scopeName: string): Promise<TextMateGrammar> {
    const targetLang = customLangs.find(item => item.sourceName === scopeName)
    console.log('fetchGrammar targetLang', scopeName, targetLang)
    if (!targetLang) throw new Error(`No grammar found for ${scopeName}`)
    const grammar = await targetLang.loadGrammar()

    const textMateGrammar: TextMateGrammar = {
      type: targetLang.grammarType,
      grammar: JSON.stringify(grammar)
    }

    return textMateGrammar
  }

  async function fetchConfiguration(language: LanguageId) {
    const targetLang = customLangs.find(item => item.id === language)
    console.log('fetchConfiguration targetLang', language, targetLang)
    if (!targetLang) throw new Error(`No configuration found for ${language}`)

    const configuration = await targetLang.loadConfiguration()
    return rehydrateRegexps(JSON.stringify(configuration))
  }

  const {SimpleLanguageInfoProvider} = await import('./providers')
  // const VsCodeDarkTheme = await (await import('./vs-dark-plus-theme')).default

  const provider = new SimpleLanguageInfoProvider({
    grammars,
    fetchGrammar,
    configurations: languages.map(language => language.id),
    fetchConfiguration,
    theme: convertTheme(darkTheme as any),
    onigLib,
    monaco
  })
  console.log('provider', provider)
  registerLanguages(languages, (language: LanguageId) => provider.fetchLanguageInfo(language), monaco)
  provider.injectCSS()
}
