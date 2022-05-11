import {DocsearchPluginOptions} from '@vuepress/plugin-docsearch'
import {RegisterComponentsPluginOptions} from '@vuepress/plugin-register-components'
import {GoogleAnalyticsPluginOptions} from '@vuepress/plugin-google-analytics'
import {ShikiPluginOptions} from '@vuepress/plugin-shiki'
import {path} from '@vuepress/utils'
import {PluginConfig} from 'vuepress'
import {isProd} from '../utils/common'
// import {demoPlugin} from './vuepress-plugin-demo'

const pathResolve = (..._path: string[]) => path.resolve(__dirname, ..._path)

const vuepressPlugins: PluginConfig[] = [
  [
    //  Algolia Search
    '@vuepress/plugin-docsearch',
    <DocsearchPluginOptions>{
      appId: '34YFD9IUQ2',
      apiKey: '9a9058b8655746634e01071411c366b8',
      indexName: 'vuepress',
      searchParameters: {
        facetFilters: ['tags:v2']
      },
      locales: {
        '/zh/': {
          placeholder: '搜索文档',
          translations: {
            button: {
              buttonText: '搜索文档',
              buttonAriaLabel: '搜索文档'
            },
            modal: {
              searchBox: {
                resetButtonTitle: '清除查询条件',
                resetButtonAriaLabel: '清除查询条件',
                cancelButtonText: '取消',
                cancelButtonAriaLabel: '取消'
              },
              startScreen: {
                recentSearchesTitle: '搜索历史',
                noRecentSearchesText: '没有搜索历史',
                saveRecentSearchButtonTitle: '保存至搜索历史',
                removeRecentSearchButtonTitle: '从搜索历史中移除',
                favoriteSearchesTitle: '收藏',
                removeFavoriteSearchButtonTitle: '从收藏中移除'
              },
              errorScreen: {
                titleText: '无法获取结果',
                helpText: '你可能需要检查你的网络连接'
              },
              footer: {
                selectText: '选择',
                navigateText: '切换',
                closeText: '关闭',
                searchByText: '搜索提供者'
              },
              noResultsScreen: {
                noResultsText: '无法找到相关结果',
                suggestedQueryText: '你可以尝试查询',
                reportMissingResultsText: '你认为该查询应该有结果？',
                reportMissingResultsLinkText: '点击反馈'
              }
            }
          }
        }
      }
    }
  ],

  [
    // for google search
    '@vuepress/plugin-google-analytics',
    <GoogleAnalyticsPluginOptions>{
      id: ''
    }
  ],

  [
    // auto register global components
    '@vuepress/plugin-register-components',
    <RegisterComponentsPluginOptions>{
      componentsDir: pathResolve('../components')
    }
  ],
  // demoPlugin()
  ['vuepress-plugin-sandbox', {}]
]

if (isProd) {
  vuepressPlugins.push([
    // code highlighting
    '@vuepress/plugin-shiki',
    <ShikiPluginOptions>{
      theme: 'dark-plus'
    }
  ])
}

export const plugins = vuepressPlugins
