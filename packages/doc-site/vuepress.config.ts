import type {ViteBundlerOptions} from '@vuepress/bundler-vite'
import {defineUserConfig} from '@vuepress/cli'
import type {DefaultThemeOptions} from '@vuepress/theme-default'

export default defineUserConfig<DefaultThemeOptions, ViteBundlerOptions>({
  // when using vuepress-vite package, you can omit this field
  // because vite is the default bundler
  bundler: '@vuepress/bundler-vite',
  // options for vite bundler
  bundlerConfig: {
    // see below
  }
})
