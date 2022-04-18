import {defineComponent, h, VNode} from 'vue-demi'

export type DefineComponent = ReturnType<typeof defineComponent>
export type VNodeArrayChildren = Array<VNodeArrayChildren | VNodeChildAtom>
export type VNodeChild = VNodeChildAtom | VNodeArrayChildren
export type VNodeChildAtom = VNode | string | number | boolean | null | undefined | void

export type CreateElement = typeof h

export type JsxNode = JSX.Element | VNodeChild

export type VueComponentConstructor = DefineComponent
