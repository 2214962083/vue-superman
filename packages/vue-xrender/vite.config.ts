import {defineConfig, LibraryFormats, UserConfig} from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'
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

const getViteConfig = (minify: boolean): UserConfig => {
  const outputMap = getOutputMap(minify)

  const plugins = [vue()]

  return {
    plugins,
    resolve: {
      dedupe: ['vue', 'vue-demi', '@vue/runtime-core'] // use the same version
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
export const unMinifyConfig = getViteConfig(false)

// build prod and build prod config
export const minifyConfig = getViteConfig(true)

export default defineConfig(unMinifyConfig)
