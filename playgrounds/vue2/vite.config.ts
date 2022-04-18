import path from 'path'
import {defineConfig} from 'vite'
import {createVuePlugin} from 'vite-plugin-vue2'
import ScriptSetup from 'unplugin-vue2-script-setup/vite'
import {switchVersion} from 'vue-demi/scripts/utils.js'

const pathResolve = (..._path: string[]) => path.resolve(__dirname, ..._path)

switchVersion(2)

export default defineConfig({
  server: {
    host: true
  },
  plugins: [
    createVuePlugin({
      jsx: true,
      jsxOptions: {
        compositionAPI: true
      }
    }),
    ScriptSetup() // supports vue3 setup sugar
  ],
  resolve: {
    dedupe: ['vue', 'vue-demi', '@vue/runtime-core', '@vue/runtime-dom'], // use the same version
    alias: {
      vue: pathResolve('./node_modules/vue/dist/vue.esm.js') // use the same version, also use runtime template compiler
    }
  }
})
