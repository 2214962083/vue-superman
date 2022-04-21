import path from 'path'
import {defineConfig} from 'vite'
import Vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import {switchVersion} from 'vue-demi/scripts/utils.js'

const pathResolve = (..._path: string[]) => path.resolve(__dirname, ..._path)

switchVersion(3)

export default defineConfig({
  server: {
    host: true
  },
  plugins: [Vue(), vueJsx()],
  resolve: {
    dedupe: ['vue', 'vue-demi', '@vue/runtime-core', '@vue/runtime-dom'], // use the same version
    alias: {
      vue: pathResolve('./node_modules/vue/dist/vue.esm-browser.js') // use the same version, also use runtime template compiler
    }
  }
})
