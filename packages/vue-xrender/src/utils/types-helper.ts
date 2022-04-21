/* eslint-disable @typescript-eslint/no-explicit-any */
import {defineComponent, h, VNode} from 'vue-demi'

export type DefineComponent = ReturnType<typeof defineComponent>
export type VNodeArrayChildren = Array<VNodeArrayChildren | VNodeChildAtom>
export type VNodeChild = VNodeChildAtom | VNodeArrayChildren
export type VNodeChildAtom = VNode | string | number | boolean | null | undefined | void

export type CreateElement = typeof h

export type JsxNode = JSX.Element | VNodeChild

export type VueComponentConstructor = DefineComponent

export type JsxDefaultProps = Record<string, any>

export type JsxProps<P extends JsxDefaultProps = JsxDefaultProps, T extends JsxNode = JsxNode> = P & {
  children: T
}

export type JsxFn<P extends JsxDefaultProps = JsxDefaultProps, T extends JsxNode = JsxNode> = (
  props: JsxProps<P, T>,
  h?: CreateElement
) => JsxNode

export type FunctionComponent = {
  functional: true
  render: (h: CreateElement, context: any) => VNode
}

export type Vue2CompileResult = {
  render(h: CreateElement): VNode
  staticRenderFns: (() => VNode)[]
}
