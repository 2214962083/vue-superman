import type {NavbarConfig} from '@vuepress/theme-default'
import {version} from '../../utils/common'

export const en: NavbarConfig = [
  {
    text: 'Guide',
    link: '/guide/'
  },
  {
    text: 'Libs',
    children: [
      {
        text: 'vue-xrender',
        children: ['/libs/vue-xrender/README.md']
      },
      {
        text: 'class-mock',
        children: ['/libs/class-mock/README.md']
      }
    ]
  },
  {
    text: `v${version}`,
    children: [
      {
        text: 'Releases',
        link: 'https://github.com/2214962083/vue-superman/releases'
      }
    ]
  }
]
