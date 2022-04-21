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
    const {$props, $parent} = this as InstanceType<typeof vm>
    const {tpl, ctx} = $props
    const _ctx = ctx || $parent || {}

    // console.log('render', isVue2, tpl, _ctx)

    if (!tpl) return null

    const renderFunc = compile(tpl, _ctx)
    const result = isVue2 ? renderFunc(h) : renderFunc(ctx)

    return result as VNode
  }
})

export default vm
