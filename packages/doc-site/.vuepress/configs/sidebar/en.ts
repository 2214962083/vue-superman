import type {SidebarConfig, SidebarGroupCollapsible} from '@vuepress/theme-default'

export const en: SidebarConfig = {
  '/guide/': [
    {
      text: 'Guide',
      children: ['/guide/README.md', '/guide/questions.md']
    }
  ],
  '/libs/vue-xrender/': [
    {
      text: 'vue-xrender',
      children: ['/libs/vue-xrender/README.md', '/libs/vue-xrender/components.md', '/libs/vue-xrender/hooks.md']
    }
  ],
  '/libs/class-mock/': [
    {
      text: 'class-mock',
      children: [
        '/libs/class-mock/README.md',
        '/libs/class-mock/class-decorators.md',
        <SidebarGroupCollapsible>{
          text: 'Property Decorators',
          collapsible: true,
          children: ['/libs/class-mock/property-config-decorators.md', '/libs/class-mock/property-faker-decorators.md']
        },
        '/libs/class-mock/property-entity-decorators.md',
        '/libs/class-mock/property-custom-decorators.md',
        '/libs/class-mock/utils.md'
      ]
    }
  ],
  '/libs/vue-playground/': [
    {
      text: 'vue-playground',
      children: [
        '/libs/vue-playground/README.md',
        '/libs/vue-playground/configuration.md',
        '/libs/vue-playground/example.md'
      ]
    }
  ],
  '/libs/vuepress-plugin-sandbox/': [
    {
      text: 'vuepress-plugin-sandbox',
      children: ['/libs/vuepress-plugin-sandbox/README.md', '/libs/vuepress-plugin-sandbox/usage.md']
    }
  ]
}
