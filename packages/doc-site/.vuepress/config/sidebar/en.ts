import type {SidebarConfig} from '@vuepress/theme-default'

export const en: SidebarConfig = {
  '/guide/': [
    {
      text: 'Guide',
      children: ['/guide/README.md', '/guide/getting-started.md']
    }
  ],
  '/libs/vue-xrender/': [
    {
      text: 'vue-xrender',
      children: ['/libs/vue-xrender/README.md']
    }
  ],
  '/libs/class-mock/': [
    {
      text: 'class-mock',
      children: ['/libs/class-mock/README.md']
    }
  ]
}
