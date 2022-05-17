import {buildUtils} from 'superman-shared'
import {minifyConfig, unMinifyConfig, packagePath} from '../vite.config'

buildUtils.build({
  minifyConfig,
  unMinifyConfig,
  packagePath,
  dtsOptions: {
    // merge all .d.ts files
    rollupTypes: true
  }
})
