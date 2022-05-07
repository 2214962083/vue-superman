/* eslint-disable @typescript-eslint/no-explicit-any */

declare module '*.vue' {
  import {DefineComponent} from 'vue'
  const Component: DefineComponent<{}, {}, any>
  export default Component
}
