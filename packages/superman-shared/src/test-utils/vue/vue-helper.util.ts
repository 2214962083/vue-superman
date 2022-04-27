/* eslint-disable @typescript-eslint/no-explicit-any */
import {isVue2, FunctionalComponent, Vue2, install} from 'vue-demi'

export const nextTwoTick = () =>
  new Promise<void>(resolve => {
    setTimeout(() => {
      setTimeout(resolve)
    })
  })

export function setProps(props: Record<string, any>) {
  const {style, class: className, ...otherProps} = props
  if (isVue2) {
    return {
      style,
      class: className,
      props: otherProps
    }
  } else {
    return {
      style,
      class: className,
      ...props
    }
  }
}

export function createFunctionComponent(fn: (...args: any[]) => any) {
  if (isVue2) {
    return {
      functional: true,
      render: fn
    }
  } else {
    return fn as FunctionalComponent
  }
}

/**
 * get functional component slots
 * @param ctx functional component context
 * @returns slots
 */
export function getSlots(ctx: any, slotName: string) {
  let slots: Record<string, any>
  if (isVue2) {
    slots = ctx.slots?.()
  } else {
    slots = ctx.slots
  }
  const slot = slots?.[slotName]
  return typeof slot === 'function' ? slot() : slot
}

export function setupVueSwitch() {
  if (isVue2) {
    Vue2.config.productionTip = false
    Vue2.config.devtools = false
    install(Vue2) // install vue composition-api
  }
}
