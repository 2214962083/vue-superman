import {path} from '@vuepress/utils'
import {ViteBundlerOptions} from 'vuepress'

const pathResolve = (..._path: string[]) => path.resolve(__dirname, ..._path)

export const bundlerConfig: ViteBundlerOptions = {
  viteOptions: {
    resolve: {
      alias: [
        {
          find: /@(?=\/)/,
          replacement: pathResolve('./.vuepress')
        }
      ]
    }
  }
}
