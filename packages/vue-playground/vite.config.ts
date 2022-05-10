/// <reference types="vitest" />
import {defineConfig, UserConfig, PluginOption, Alias} from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import {buildUtils} from 'superman-shared'

const pathResolve = (..._path: string[]) => path.resolve(__dirname, ..._path)

export const packagePath = pathResolve('./')

interface CreateViteConfigOptions {
  minify?: boolean
}

const createViteConfig = (options: CreateViteConfigOptions = {}): UserConfig => {
  const {minify = false} = options

  const plugins: PluginOption[] = [vue(), vueJsx()]

  const alias: Alias[] = [
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
      vue: 'Vue'
    }
  })
}

// default config and build prod config
export const unMinifyConfig = createViteConfig({minify: false})

// build prod and build prod config
export const minifyConfig = createViteConfig({minify: true})

// for vitest
export default defineConfig(unMinifyConfig)
