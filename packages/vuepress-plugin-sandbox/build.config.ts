import {defineBuildConfig} from 'unbuild'

export default defineBuildConfig({
  entries: ['src/index', 'src/client', 'src/enhanceAppFile'],
  clean: true,
  declaration: true,
  // externals: ['js-base64'],
  rollup: {
    emitCJS: true,
    cjsBridge: true,
    inlineDependencies: true
  }
})
