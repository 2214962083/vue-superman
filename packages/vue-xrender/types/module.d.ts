/* eslint-disable @typescript-eslint/no-explicit-any */
declare module '*.vue' {
  import {DefineComponent} from 'vue-demi'
  const Component: DefineComponent<{}, {}, any>
  export default Component
}

declare module 'virtual:*' {
  const result: any
  export default result
}

declare module 'vue-demi/scripts/utils.js' {
  /**
   * switch vue version
   */
  const switchVersion: (vueVersion: 2 | 3 | number) => void
}
