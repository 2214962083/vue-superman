import {buildUtils} from 'superman-shared'
import {minifyConfig, unMinifyConfig, packagePath} from '../vite.config'
import {BuildOptions} from 'vite'

type GetItemType<T> = T extends Array<infer U> ? U : T
type RollupOutput = NonNullable<NonNullable<BuildOptions['rollupOptions']>['output']>
type OutputOptions = GetItemType<RollupOutput>

const changeConfigFn: buildUtils.ChangeConfigFn = (config, options) => {
  if (!config.build) config.build = {}
  if (!config.build.rollupOptions) config.build.rollupOptions = {}

  const oldOutput = config.build.rollupOptions.output
  if (!Array.isArray(oldOutput)) {
    const newOutput: OutputOptions = {
      ...oldOutput,
      inlineDynamicImports: false,
      manualChunks: {
        babel: ['@babel/standalone', '@babel/types'],
        'emmet-monaco': ['emmet-monaco-es']
      }
    }
    config.build.rollupOptions.output = newOutput
  }

  return buildUtils.changeViteConfig(config, options)
}

buildUtils.build({
  minifyConfig,
  unMinifyConfig,
  packagePath,
  changeConfigFn
})
