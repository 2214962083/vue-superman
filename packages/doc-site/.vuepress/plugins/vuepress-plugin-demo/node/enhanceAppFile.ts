import {VUE_PLAYGROUND_NAME} from './constants'
import {defineClientAppEnhance} from '@vuepress/client'
import {h} from 'vue'
import Playground from '../client/playground/playground.vue'
import * as base64 from 'js-base64'

export default defineClientAppEnhance(({app}) => {
  // wrap the component with default options
  app.component(VUE_PLAYGROUND_NAME, props => h(Playground, {...props}))
  app.config.globalProperties.base64 = base64
})
