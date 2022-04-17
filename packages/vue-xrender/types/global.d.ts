/* eslint-disable @typescript-eslint/no-explicit-any */
import type {VNodeChild, ComponentPublicInstance, FunctionalComponent, PropType as VuePropType} from 'vue'

declare global {
  // vue
  type PropType<T> = VuePropType<T>
  type VueNode = VNodeChild | JSX.Element

  type Writable<T> = {
    -readonly [P in keyof T]: T[P]
  }

  type DeepPartial<T> = {
    [P in keyof T]?: DeepPartial<T[P]>
  }

  type TimeoutHandle = ReturnType<typeof setTimeout>
  type IntervalHandle = ReturnType<typeof setInterval>

  type DOMEvent<T extends Element = HTMLElement, E extends Event = Event> = E & {
    target: T | null
  }

  function parseInt(s: string | number, radix?: number): number

  function parseFloat(string: string | number): number
}

declare module 'vue' {
  export type JSXComponent<Props = any> = {new (): ComponentPublicInstance<Props>} | FunctionalComponent<Props>
}

export {}
