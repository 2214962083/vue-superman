/* eslint-disable @typescript-eslint/no-explicit-any */
import {FunctionComponent, JsxFn, JsxNode} from '@/utils/types-helper'
import {defineComponent, VNode, h, PropType} from 'vue-demi'

const valueIsFunctionComponent = (value: any): value is FunctionComponent => {
  return typeof value === 'object' && value.functional && typeof value.render === 'function'
}

/**
 * jsx render component
 *
 * @example
 * ```jsx
 * <x-jsx :jsx="yourJsx">
 *  i am child text
 * </x-jsx>
 *
 * const yourJsx = <div>hello</div>
 * const yourJsx = (props) => <div>hello, {props.children}</div>
 * ```
 */
const vm = defineComponent({
  name: 'XJsx',
  props: {
    jsx: {
      type: [Function, Object, Array, String, Number, Boolean] as PropType<JsxNode | JsxFn | FunctionComponent>
    }
  },
  render(): VNode {
    const {$slots, $attrs, $props} = this as InstanceType<typeof vm>
    const {jsx} = $props

    const children = typeof $slots.default === 'function' ? $slots.default() : $slots.default
    const props = {...$attrs, children}

    let result: VNode

    if (valueIsFunctionComponent(jsx)) {
      result = jsx.render(h, props)
    } else if (typeof jsx === 'function') {
      result = jsx(props, h) as VNode
    } else {
      result = jsx as VNode
    }

    return result
  }
})

export default vm
