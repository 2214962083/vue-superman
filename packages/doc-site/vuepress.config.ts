import {defineUserConfig} from 'vuepress'
import {path} from '@vuepress/utils'
import {viteBundler} from '@vuepress/bundler-vite'
import {plugins} from './.vuepress/plugins'
import {bundlerConfig} from './bundler.config'
import {localTheme} from './.vuepress/theme'

const pathResolve = (..._path: string[]) => path.resolve(__dirname, ..._path)

export default defineUserConfig({
  base: '/',

  head: [
    [
      'link',
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: `/images/icons/favicon-16x16.png`
      }
    ],
    [
      'link',
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: `/images/icons/favicon-32x32.png`
      }
    ],
    ['link', {rel: 'manifest', href: '/manifest.webmanifest'}],
    ['meta', {name: 'application-name', content: 'Vue Superman'}],
    ['meta', {name: 'apple-mobile-web-app-title', content: 'Vue Superman'}],
    ['meta', {name: 'apple-mobile-web-app-status-bar-style', content: 'black'}],
    ['link', {rel: 'apple-touch-icon', href: `/images/icons/apple-touch-icon.png`}],
    [
      'link',
      {
        rel: 'mask-icon',
        href: '/images/icons/safari-pinned-tab.svg',
        color: '#ff3d00'
      }
    ],
    ['meta', {name: 'msapplication-TileColor', content: '#ff3d00'}],
    ['meta', {name: 'theme-color', content: '#ff3d00'}]
  ],

  // site-level locales config
  locales: {
    '/': {
      lang: 'en-US',
      title: 'Vue Superman',
      description: 'vue useful lib collection, use vue like a superman'
    },
    '/zh/': {
      lang: 'zh-CN',
      title: 'Vue Superman',
      description: 'vue 好用的 lib 合集，像超人一样使用 vue'
    }
  },

  theme: localTheme(),

  markdown: {
    importCode: {
      handleImportPath: str => {
        return str.replace(/^vue-xrender/, pathResolve('../vue-xrender'))
      }
    }
  },
  bundler: viteBundler(bundlerConfig),
  plugins
})
