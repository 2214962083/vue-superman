/// <reference types="vitest" />
import {InlineConfig, LibraryFormats, UserConfig, PluginOption, Alias} from 'vite'
import path from 'path'

export const pascalCase = (str: string) =>
  str
    .split('-')
    .map(s => s.charAt(0).toUpperCase() + s.slice(1))
    .join('')

// const pathResolve = (..._path: string[]) => path.resolve(__dirname, ..._path)

const getOutputIndexName = (minify: boolean) => (minify ? 'index.min' : 'index')

export const getOutputMap = (minify: boolean): Record<LibraryFormats, string> => ({
  es: `${getOutputIndexName(minify)}.mjs`,
  cjs: `${getOutputIndexName(minify)}.cjs`,
  umd: `${getOutputIndexName(minify)}.umd.js`,
  iife: `${getOutputIndexName(minify)}.iife.js`
})

export interface CreateViteConfigOptions {
  minify?: boolean
  packagePath: string
  formats?: LibraryFormats[]
  externalMap?: Record<string, string>
  dedupe?: string[] // use the same version
  plugins?: PluginOption[]
  alias?: Alias[]
  test?: InlineConfig
}

export const createViteConfig = (options: CreateViteConfigOptions): UserConfig => {
  const {
    minify = false,
    packagePath,
    formats = ['es', 'cjs', 'umd', 'iife'],
    externalMap = {},
    dedupe: _dedupe = [],
    plugins = [],
    alias: _alias = [],
    test
  } = options

  const outputMap = Object.fromEntries(
    Object.entries(getOutputMap(minify)).filter(([format]) => formats.includes(format as LibraryFormats))
  ) as Record<LibraryFormats, string>

  const pathResolve = (..._path: string[]) => path.resolve(packagePath, ..._path)

  const pkg = require(pathResolve('./package.json'))
  const getPkgName = () => pkg.name

  const dedupe = [
    'vue',
    'vue-demi',
    '@vue/runtime-core',
    '@vue/runtime-dom',
    'vue2',
    '@vue/composition-api',
    ..._dedupe
  ] // use the same version

  const alias: Alias[] = [
    ..._alias,
    {
      find: /@(?=\/)/,
      replacement: pathResolve('src')
    },
    {
      find: /^@test/,
      replacement: pathResolve('test')
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
          globals: externalMap,
          chunkFileNames: () => {
            return '[format]/[name].[format].js'
          }
        },
        external: Object.keys(externalMap)
      },
      sourcemap: true,
      minify
    },
    // for vitest
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: [pathResolve('./test/setup.ts')],
      reporters: 'dot',
      deps: {
        inline: ['vue', 'vue2', 'vue-demi', '@vue/composition-api']
      },
      ...test
    }
  }
}
