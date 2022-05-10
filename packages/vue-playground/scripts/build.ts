import {buildUtils} from 'superman-shared'
import {minifyConfig, unMinifyConfig, packagePath} from '../vite.config'

const changeConfigFn: buildUtils.ChangeConfigFn = (config, options) => {
  return buildUtils.changeViteConfig(config, options)
}

buildUtils.build({
  minifyConfig,
  unMinifyConfig,
  packagePath,
  changeConfigFn
})
