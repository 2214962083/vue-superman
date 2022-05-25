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
        link: '/libs/vue-xrender/README.md'
      },
      {
        text: 'class-mock',
        link: '/libs/class-mock/README.md'
      },
      {
        text: 'vue-playground',
        link: '/libs/vue-playground/README.md'
      },
      {
        text: 'vuepress-plugin-sandbox',
        link: '/libs/vuepress-plugin-sandbox/README.md'
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
