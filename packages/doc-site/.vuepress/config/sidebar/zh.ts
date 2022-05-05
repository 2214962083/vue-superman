import type {SidebarConfig} from '@vuepress/theme-default'

export const zh: SidebarConfig = {
  '/zh/guide/': [
    {
      text: '指南',
      children: ['/zh/guide/README.md', '/zh/guide/getting-started.md']
    }
  ],
  '/zh/libs/vue-xrender/': [
    {
      text: 'vue-xrender',
      children: ['/zh/libs/vue-xrender/README.md']
    }
  ],
  '/zh/libs/class-mock/': [
    {
      text: 'class-mock',
      children: ['/zh/libs/class-mock/README.md']
    }
  ]
}
