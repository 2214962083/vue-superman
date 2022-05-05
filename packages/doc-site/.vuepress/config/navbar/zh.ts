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
        children: ['/zh/libs/vue-xrender/README.md']
      },
      {
        text: 'class-mock',
        children: ['/zh/libs/class-mock/README.md']
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
