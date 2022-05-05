import type {SidebarConfig} from '@vuepress/theme-default'

export const zh: SidebarConfig = {
  '/zh/guide/': [
    {
      text: '指南',
      children: ['/zh/guide/README.md', '/zh/guide/questions.md']
    }
  ],
  '/zh/libs/vue-xrender/': [
    {
      text: 'vue-xrender',
      children: [
        '/zh/libs/vue-xrender/README.md',
        '/zh/libs/vue-xrender/components.md',
        '/zh/libs/vue-xrender/hooks.md'
      ]
    }
  ],
  '/zh/libs/class-mock/': [
    {
      text: 'class-mock',
      children: [
        '/zh/libs/class-mock/README.md',
        '/zh/libs/class-mock/property-config-decorators.md',
        '/zh/libs/class-mock/property-faker-decorators.md',
        '/zh/libs/class-mock/class-decorators.md',
        '/zh/libs/class-mock/utils.md'
      ]
    }
  ]
}
