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
      return (await import('./langs/vue.tmLanguage.json')).default
    },
    async loadConfiguration() {
      return (await import('./langs/vue-language-configuration.json')).default
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
      return (await import('./langs/html.tmLanguage.json')).default
    }
  },
  {
    id: 'vue-html',
    sourceName: 'text.html.vue-html',
    lang: {
      extensions: ['.vue-html'],
      aliases: ['vue-html']
    },
    tmLanguagePath: 'vue-html.tmLanguage.json',
    grammarType: 'json',
    async loadGrammar() {
      return (await import('./langs/vue-html.tmLanguage.json')).default
    },
    async loadConfiguration() {
      return (await import('./langs/vue-html-language-configuration.json')).default
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
      return (await import('./langs/css.tmLanguage.json')).default
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
      return (await import('./langs/typescript.tmLanguage.json')).default
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
      return (await import('./langs/tsx.tmLanguage.json')).default
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
      return (await import('./langs/typescript.tmLanguage.json')).default
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
      return (await import('./langs/tsx.tmLanguage.json')).default
    }
  }
]

export {registerLanguagesForMonaco} from './register'
