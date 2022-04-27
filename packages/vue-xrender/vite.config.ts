/// <reference types="vitest" />
import {defineConfig, UserConfig, PluginOption, Alias} from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import {buildUtils} from 'superman-shared'
import {isVue2} from 'vue-demi'

const pathResolve = (..._path: string[]) => path.resolve(__dirname, ..._path)

export const packagePath = pathResolve('./')

const vue2Path = pathResolve('./node_modules/vue2/dist/vue.esm.js')
const vue3Path = pathResolve('./node_modules/vue/dist/vue.esm-browser.js')
interface CreateViteConfigOptions {
  minify?: boolean
}

const createViteConfig = (options: CreateViteConfigOptions = {}): UserConfig => {
  const {minify = false} = options

  const plugins: PluginOption[] = [vue(), vueJsx()]

  const alias: Alias[] = [
    {
      find: /^vue$/,
      replacement: isVue2 ? vue2Path : vue3Path // use the same version, an use runtime template compiler
    },
    {
      // for vue-demi
      find: /^vue2$/,
      replacement: vue2Path
    },
    {
      find: /^@vue\/test-utils$/,
      replacement: pathResolve('./node_modules/@vue/test-utils/dist/vue-test-utils.esm-browser.js') // use the same version
    }
  ]

  return buildUtils.createViteConfig({
    packagePath,
    minify,
    plugins,
    alias,
    externalMap: {
      vue: 'Vue',
      'vue-demi': 'VueDemi',
      '@vue/composition-api': 'VueCompositionAPI'
    }
  })
}

// default config and build prod config
export const unMinifyConfig = createViteConfig({minify: false})

// build prod and build prod config
export const minifyConfig = createViteConfig({minify: true})

// for vitest
export default defineConfig(unMinifyConfig)
