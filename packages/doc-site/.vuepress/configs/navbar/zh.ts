import type {NavbarConfig} from '@vuepress/theme-default'
import {version} from '../../utils/common'

export const zh: NavbarConfig = [
  {
    text: '指南',
    link: '/zh/guide/'
  },
  {
    text: '库列表',
    children: [
      {
        text: 'vue-xrender',
        link: '/zh/libs/vue-xrender/README.md'
      },
      {
        text: 'class-mock',
        link: '/zh/libs/class-mock/README.md'
      },
      {
        text: 'vue-playground',
        link: '/zh/libs/vue-playground/README.md'
      },
      {
        text: 'vuepress-plugin-sandbox',
        link: '/zh/libs/vuepress-plugin-sandbox/README.md'
      }
    ]
  },
  {
    text: `v${version}`,
    children: [
      {
        text: '更新日志',
        link: 'https://github.com/2214962083/vue-superman/releases'
      }
    ]
  }
]
