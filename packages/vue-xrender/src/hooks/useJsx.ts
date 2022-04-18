/* eslint-disable @typescript-eslint/no-explicit-any */
import {defineComponent, getCurrentInstance, VNode, h} from 'vue-demi'
import type {DefineComponent, VNodeChild} from '@vue/runtime-dom'

export type CreateElement = typeof h

export type JsxNode = JSX.Element | VNodeChild

export type VueComponentConstructor = DefineComponent

export type JsxProps<T extends JsxNode = JsxNode> = Record<string, any> & {
  children: T
}

export type JsxFn = (props: JsxProps, h?: CreateElement) => JsxNode

/**
 * create a vue component from jsx
 * @param name component name in template
 * @param jsx jsx node, if you want to reactive the component, you can use `() => jsx`
 */
export function useJsx(name: string, jsx: JsxNode | JsxFn): VueComponentConstructor

/**
 * create a vue component from jsx
 * @param jsx jsx node, if you want to reactive the component, you can use `() => jsx`
 */
export function useJsx(jsx: JsxNode | JsxFn): VueComponentConstructor

export function useJsx(...args: any[]) {
  const name: string | undefined = args[1] ? args[0] : undefined
  const jsx: JsxNode | JsxFn = args[1] ? args[1] : args[0]

  const instance = getCurrentInstance()?.proxy
  if (!instance) throw new Error(`useJsx error: instance not found，name: ${name}`)

  const jsxCom = defineComponent({
    name,
    render(): VNode {
      const {$slots, $attrs} = this as InstanceType<typeof jsxCom>
      const children = typeof $slots.default === 'function' ? $slots.default() : $slots.default
      const props = {...$attrs, children}
      const result = typeof jsx === 'function' ? jsx(props, h) : jsx
      return result as VNode
    }
  })

  if (name) {
    if (!instance.$options.components) instance.$options.components = {}

    instance.$options.components[name] = jsxCom
  }

  return jsxCom as unknown as VueComponentConstructor
}
