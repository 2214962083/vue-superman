/* eslint-disable @typescript-eslint/no-explicit-any */
import type {CustomMonacoLanguage} from '@/playground/utils/types-helper'

export const defaultCustomLangs: CustomMonacoLanguage[] = [
  {
    id: 'vue',
    sourceName: 'source.vue',
    lang: {
      extensions: ['.vue'],
      aliases: ['vue']
    },
    tmLanguagePath: 'Vue.tmLanguage.json',
    grammarType: 'json',
    async loadGrammar() {
      return import('./langs/vue.tmLanguage.json')
    },
    async loadConfiguration() {
      return import('./langs/vue-language-configuration.json')
    }
  }
]

export {registerLanguagesForMonaco} from './text-mate'
