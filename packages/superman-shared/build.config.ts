import {defineBuildConfig} from 'unbuild'

export default defineBuildConfig({
  entries: ['src/index', 'src/test-utils', 'src/test-vue-utils'],
  clean: true,
  declaration: true,
  externals: ['vite', 'vue-demi', 'vitest'],
  rollup: {
    emitCJS: true,
    cjsBridge: true
  }
})
