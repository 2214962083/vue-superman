/* eslint-disable @typescript-eslint/no-explicit-any */
import {Vue2CompileResult} from '@/utils/types-helper'
import {Vue, defineComponent, VNode, h, PropType, isVue2} from 'vue-demi'

// Use weak map to store the mapping relationship between ctx and {[template]: renderFunction}
// This memory will be automatically reclaimed when other references to ctx are destroyed (related to the browser memory reclamation mechanism)
const compileMap = new WeakMap<Object, Record<string, Function>>()

/**
 * compile a template to render function
 * @param template template string
 * @param ctx context
 * @returns render function
 */
const compile = (template: string, ctx: Object): Function => {
  const historyResults = compileMap.get(ctx)
  if (historyResults && historyResults[template]) return historyResults[template].bind(ctx)

  let renderFunc: Function
  if (isVue2) {
    const compileResult = Vue.compile(template) as unknown as Vue2CompileResult
    renderFunc = compileResult.staticRenderFns?.[0] ?? compileResult.render
  } else {
    renderFunc = Vue.compile(template)
  }

  if (typeof renderFunc !== 'function') throw new Error(`XTpl compile error: ${template}`)

  const results = {
    ...historyResults,
    [template]: renderFunc
  }
  compileMap.set(ctx, results)
  return renderFunc.bind(ctx)
}

/**
 * template render component
 *
 * @example
 * ```jsx
 * <x-tpl :tpl="yourTemplate" :ctx="this" />
 *
 * export default {
 *  data() {
 *   return {
 *    name: 'xiao ming',
 *    yourTemplate: '<div>hello, {{name}}</div>'
 *   }
 * }
 * ```
 */
const vm = defineComponent({
  name: 'XTpl',
  props: {
    tpl: {
      type: String
    },
    ctx: {
      type: Object as PropType<Record<string, any>>
    }
  },
  render() {
    const {$props, $parent, $slots} = this as InstanceType<typeof vm>
    const {tpl, ctx} = $props
    let finalCtx = ctx || $parent || {}

    if (isVue2) {
      finalCtx.$slots = $slots
    } else {
      if (finalCtx._) {
        // $parent is vm, not setup sugar expose
        const _vm = finalCtx._
        finalCtx = {
          ...vm.data,
          ..._vm.setupState
        }
      }
      // vue3 cover $slots will throw error
      finalCtx = {
        ...finalCtx,
        $slots
      }
    }

    if (!tpl) return null

    const renderFunc = compile(tpl, finalCtx)
    const result = isVue2 ? renderFunc(h) : renderFunc(finalCtx)

    return result as VNode
  }
})

export default vm
