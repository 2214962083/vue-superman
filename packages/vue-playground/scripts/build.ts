import {buildUtils} from 'superman-shared'
import {minifyConfig, unMinifyConfig, packagePath} from '../vite.config'

const changeConfigFn: buildUtils.ChangeConfigFn = (config, options) => {
  if (!config.build) config.build = {}
  if (!config.build.rollupOptions) config.build.rollupOptions = {}
  if (!config.build.rollupOptions.output) config.build.rollupOptions.output = {}
  config.build.rollupOptions.output = {
    inlineDynamicImports: false,
    manualChunks: {
      monaco: ['monaco-editor', 'emmet-monaco-es']
    }
  }
  return buildUtils.changeViteConfig(config, options)
}

buildUtils.build({
  minifyConfig,
  unMinifyConfig,
  packagePath,
  changeConfigFn
})
