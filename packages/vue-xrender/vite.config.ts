import {defineConfig, LibraryFormats, UserConfig, PluginOption, Alias} from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import pkg from './package.json'

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
      find: /^vue$/,
      replacement: pathResolve('./node_modules/vue/dist/vue.runtime.esm-browser.js') // use the same version, an use runtime template compiler
    }
  ]

  return <UserConfig>{
    root: pathResolve('./'),
    plugins,
    resolve: {
      dedupe: ['vue', 'vue-demi', '@vue/runtime-core'], // use the same version
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
    }
  }
}

// default config and build prod config
export const unMinifyConfig = createViteConfig({minify: false})

// build prod and build prod config
export const minifyConfig = createViteConfig({minify: true})

export default defineConfig(unMinifyConfig)
