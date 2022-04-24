/// <reference types="vitest" />
import {defineConfig, LibraryFormats, UserConfig, PluginOption, Alias} from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import pkg from './package.json'
import {isVue2} from 'vue-demi'

const getPkgName = () => pkg.name

const pascalCase = (str: string) =>
  str
    .split('-')
    .map(s => s.charAt(0).toUpperCase() + s.slice(1))
    .join('')

const pathResolve = (..._path: string[]) => path.resolve(__dirname, ..._path)

const getOutputIndexName = (minify: boolean) => (minify ? 'index.min' : 'index')

const getOutputMap = (minify: boolean): Record<LibraryFormats, string> => ({
  es: `${getOutputIndexName(minify)}.mjs`,
  cjs: `${getOutputIndexName(minify)}.cjs`,
  umd: `${getOutputIndexName(minify)}.umd.js`,
  iife: `${getOutputIndexName(minify)}.iife.js`
})

const externalMap: Record<string, string> = {
  vue: 'Vue',
  'vue-demi': 'VueDemi',
  '@vue/composition-api': 'VueCompositionAPI'
}

const vue2Path = pathResolve('./node_modules/vue2/dist/vue.esm.js')
const vue3Path = pathResolve('./node_modules/vue/dist/vue.esm-browser.js')

const dedupe: string[] = ['vue', 'vue-demi', '@vue/runtime-core', '@vue/runtime-dom', 'vue2', '@vue/composition-api'] // use the same version

interface CreateViteConfigOptions {
  minify?: boolean
}

const createViteConfig = (options: CreateViteConfigOptions = {}): UserConfig => {
  const {minify = false} = options
  const outputMap = getOutputMap(minify)

  const plugins: PluginOption[] = [vue(), vueJsx()]

  const alias: Alias[] = [
    {
      find: /@(?=\/)/,
      replacement: pathResolve('src')
    },
    {
      find: /^@test/,
      replacement: pathResolve('test')
    },
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

  return <UserConfig>{
    root: pathResolve('./'),
    plugins,
    resolve: {
      dedupe,
      alias
    },
    optimizeDeps: {
      exclude: ['vue-demi']
    },
    build: {
      outDir: pathResolve('dist'),
      lib: {
        entry: pathResolve('src/index.ts'),
        name: pascalCase(getPkgName()),
        formats: <LibraryFormats[]>Object.keys(outputMap),
        fileName: format => outputMap[format as LibraryFormats]
      },
      rollupOptions: {
        output: {
          globals: externalMap
        },
        external: Object.keys(externalMap)
      },
      sourcemap: true,
      minify
    },
    // for vitest
    test: {
      globals: true,
      open: true,
      environment: 'jsdom',
      setupFiles: [pathResolve('./test/setup.ts')],
      reporters: 'dot',
      deps: {
        inline: ['vue2', 'vue-demi', '@vue/composition-api']
      }
    }
  }
}

// default config and build prod config
export const unMinifyConfig = createViteConfig({minify: false})

// build prod and build prod config
export const minifyConfig = createViteConfig({minify: true})

// for vitest
export default defineConfig(unMinifyConfig)
