import type {SidebarConfig, SidebarGroupCollapsible} from '@vuepress/theme-default'

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
        '/zh/libs/class-mock/class-decorators.md',
        <SidebarGroupCollapsible>{
          text: '属性装饰器',
          collapsible: true,
          children: [
            '/zh/libs/class-mock/property-config-decorators.md',
            '/zh/libs/class-mock/property-faker-decorators.md'
          ]
        },
        '/zh/libs/class-mock/property-entity-decorators.md',
        '/zh/libs/class-mock/property-custom-decorators.md',
        '/zh/libs/class-mock/utils.md'
      ]
    }
  ],
  '/zh/libs/vue-playground/': [
    {
      text: 'vue-playground',
      children: [
        '/zh/libs/vue-playground/README.md',
        '/zh/libs/vue-playground/configuration.md',
        '/zh/libs/vue-playground/example.md'
      ]
    }
  ],
  '/zh/libs/vuepress-plugin-sandbox/': [
    {
      text: 'vuepress-plugin-sandbox',
      children: ['/zh/libs/vuepress-plugin-sandbox/README.md', '/zh/libs/vuepress-plugin-sandbox/usage.md']
    }
  ]
}
