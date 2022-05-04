/// <reference types="vitest" />
import {defineConfig, UserConfig} from 'vite'
import {buildUtils} from 'superman-shared'

export const packagePath = __dirname

interface CreateViteConfigOptions {
  minify?: boolean
}

const createViteConfig = (options: CreateViteConfigOptions = {}): UserConfig => {
  const {minify = false} = options
  return buildUtils.createViteConfig({
    packagePath,
    minify,
    externalMap: {
      '@faker-js/faker': ''
    },
    dedupe: ['@faker-js/faker'] // use the same version
  })
}

// default config and build prod config
export const unMinifyConfig = createViteConfig({minify: false})

// build prod and build prod config
export const minifyConfig = createViteConfig({minify: true})

// for vitest
export default defineConfig(unMinifyConfig)
