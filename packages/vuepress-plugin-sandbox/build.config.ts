import {defineBuildConfig} from 'unbuild'

export default defineBuildConfig({
  entries: ['src/index', 'src/client', 'src/enhanceAppFile'],
  clean: true,
  declaration: true,
  rollup: {
    emitCJS: true,
    cjsBridge: true
  }
})
