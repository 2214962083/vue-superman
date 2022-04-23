/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createApp,
  defineComponent,
  h,
  provide,
  ref,
  resolveComponent,
  InjectionKey,
  isVue2,
  Ref,
  isVue3
} from 'vue-demi'

type InstanceType<V> = V extends {new (...arg: any[]): infer X} ? X : never
type VM<V> = InstanceType<V> & {unmount(): void}

export function find(selector: string, target?: HTMLElement | null | undefined) {
  const el = target?.querySelector<HTMLElement>(selector)
  return {
    el,
    find: (selector: string) => find(selector, el),
    text() {
      return el?.textContent ?? ''
    },
    html() {
      return el?.innerHTML ?? ''
    }
  }
}

export type SnapType = 'all' | 'vue2' | 'vue3'

type MountResult<V> = VM<V> & {
  find: typeof find
  toSnap: (type?: SnapType) => void
}

export function mount<V>(Comp: V): MountResult<V> {
  const el = document.createElement('div')
  document.body.appendChild(el)
  const app = createApp(Comp)

  const unmount = () => {
    app.unmount()
    el.remove()
  }

  const comp = app.mount(el) as any as VM<V>
  comp.unmount = unmount

  const _find = (selector: string) => {
    const el = (<any>comp).$el as HTMLElement
    return find(selector, el.parentElement)
  }

  const toSnap = (type: SnapType = 'vue3') => {
    const shouldSnap = type === 'all' || (type === 'vue2' && isVue2) || (type === 'vue3' && isVue3)
    if (shouldSnap) {
      const el = (<any>comp).$el as HTMLElement
      expect(el).toMatchSnapshot()
    }
  }

  Object.assign(comp, {find: _find, toSnap})

  return comp as MountResult<V>
}

/**
 * get component for h first argument
 * @param tagName component tag name
 * @returns component for h first argument
 */
export function getComponent(tagName: string) {
  return isVue2 ? tagName : resolveComponent(tagName)
}

export function useSetup<V>(setup: () => V) {
  const Comp = defineComponent({
    setup,
    render() {
      return h('div', [])
    }
  })

  return mount(Comp)
}

export const Key: InjectionKey<Ref<number>> = Symbol('num')

export function useInjectedSetup<V>(setup: () => V) {
  const Comp = defineComponent({
    setup,
    render() {
      return h('div', [])
    }
  })

  const Provider = defineComponent({
    components: Comp,
    setup() {
      provide(Key, ref(1))
    },
    render() {
      return h('div', [])
    }
  })

  return mount(Provider)
}
