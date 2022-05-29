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
    tmLanguagePath: 'vue.tmLanguage.json',
    grammarType: 'json',
    async loadGrammar() {
      return import('./langs/vue.tmLanguage.json')
    },
    async loadConfiguration() {
      return import('./langs/vue-language-configuration.json')
    }
  },
  {
    id: 'html',
    sourceName: 'text.html.basic',
    lang: {
      extensions: ['.html'],
      aliases: ['html']
    },
    tmLanguagePath: 'html.tmLanguage.json',
    grammarType: 'json',
    async loadGrammar() {
      return import('./langs/html.tmLanguage.json')
    }
  },
  {
    id: 'css',
    sourceName: 'source.css',
    lang: {
      extensions: ['.css'],
      aliases: ['css']
    },
    tmLanguagePath: 'css.tmLanguage.json',
    grammarType: 'json',
    async loadGrammar() {
      return import('./langs/css.tmLanguage.json')
    }
  },
  {
    id: 'javascript',
    sourceName: 'source.js',
    lang: {
      extensions: ['.js'],
      aliases: ['javascript', 'js']
    },
    tmLanguagePath: 'typescript.tmLanguage.json',
    grammarType: 'json',
    async loadGrammar() {
      return import('./langs/typescript.tmLanguage.json')
    }
  },
  {
    id: 'jsx',
    sourceName: 'source.js.jsx',
    lang: {
      extensions: ['.jsx'],
      aliases: ['javascriptReact', 'jsx']
    },
    tmLanguagePath: 'tsx.tmLanguage.json',
    grammarType: 'json',
    async loadGrammar() {
      return import('./langs/tsx.tmLanguage.json')
    }
  },
  {
    id: 'typescript',
    sourceName: 'source.ts',
    lang: {
      extensions: ['.ts'],
      aliases: ['typescript', 'ts']
    },
    tmLanguagePath: 'typescript.tmLanguage.json',
    grammarType: 'json',
    async loadGrammar() {
      return import('./langs/typescript.tmLanguage.json')
    }
  },
  {
    id: 'tsx',
    sourceName: 'source.tsx',
    lang: {
      extensions: ['.tsx'],
      aliases: ['typescriptReact', 'tsx']
    },
    tmLanguagePath: 'tsx.tmLanguage.json',
    grammarType: 'json',
    async loadGrammar() {
      return import('./langs/tsx.tmLanguage.json')
    }
  }
]

export {registerLanguagesForMonaco} from './register'
