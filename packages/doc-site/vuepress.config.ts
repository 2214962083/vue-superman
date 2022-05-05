import {defineUserConfig, ThemeConfig, ViteBundlerOptions} from 'vuepress'
import {DefaultThemeOptions} from '@vuepress/theme-default'
import {path} from '@vuepress/utils'
import {navbar, sidebar} from './.vuepress/config'
import {plugins} from './.vuepress/plugins'
import {isProd} from './.vuepress/utils/common'
import {bundlerConfig} from './bundler.config'

const pathResolve = (..._path: string[]) => path.resolve(__dirname, ..._path)

export default defineUserConfig<ThemeConfig, ViteBundlerOptions>({
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

  themeConfig: <DefaultThemeOptions>{
    logo: '/images/logo.png',

    repo: '2214962083/vue-superman',

    docsDir: 'packages/doc-site',

    // theme-level locales config
    locales: {
      /**
       * English locale config
       *
       * As the default locale of @vuepress/theme-default is English,
       * we don't need to set all of the locale fields
       */
      '/': {
        // navbar
        navbar: navbar.en,

        // sidebar
        sidebar: sidebar.en,

        // page meta
        editLinkText: 'Edit this page on GitHub'
      },

      /**
       * Chinese locale config
       */
      '/zh/': {
        // navbar
        navbar: navbar.zh,
        selectLanguageName: '简体中文',
        selectLanguageText: '选择语言',
        selectLanguageAriaLabel: '选择语言',

        // sidebar
        sidebar: sidebar.zh,

        // page meta
        editLinkText: '在 GitHub 上编辑此页',
        lastUpdatedText: '上次更新',
        contributorsText: '贡献者',

        // custom containers
        tip: '提示',
        warning: '注意',
        danger: '警告',

        // 404 page
        notFound: ['这里什么都没有', '我们怎么到这来了？', '这是一个 404 页面', '看起来我们进入了错误的链接'],
        backToHome: '返回首页',

        // a11y
        openInNewWindow: '在新窗口打开',
        toggleDarkMode: '切换夜间模式',
        toggleSidebar: '切换侧边栏'
      }
    },

    themePlugins: {
      // only enable git plugin in production mode
      git: isProd,
      // use shiki plugin in production mode instead
      prismjs: !isProd,
      // disable the @vuepress/plugin-nprogress plugin to fix the bug of `Cannot set properties of undefined (setting 'NProgress')`
      nprogress: false
    }
  },

  markdown: {
    importCode: {
      handleImportPath: str => {
        return str.replace(/^vue-xrender/, pathResolve('../vue-xrender'))
      }
    }
  },
  bundler: '@vuepress/vite',
  bundlerConfig,
  plugins
})
