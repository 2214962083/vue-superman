import {path} from '@vuepress/utils'
import {SSROptions} from 'vite'
import {ViteBundlerOptions} from 'vuepress'

const pathResolve = (..._path: string[]) => path.resolve(__dirname, ..._path)
const ssr: SSROptions = {
  noExternal: ['monaco-editor']
}
export const bundlerConfig = {
  viteOptions: {
    resolve: {
      alias: [
        {
          find: /@(?=\/)/,
          replacement: pathResolve('./.vuepress')
        }
      ]
    },
    build: {
      chunkSizeWarningLimit: Infinity,
      rollupOptions: {
        output: {
          inlineDynamicImports: false,
          manualChunks: {
            monaco: ['monaco-editor']
          }
        }
      }
    },
    ssr
  }
} as ViteBundlerOptions
