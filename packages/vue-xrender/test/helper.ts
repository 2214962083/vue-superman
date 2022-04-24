/* eslint-disable @typescript-eslint/no-explicit-any */
import {isVue2, FunctionalComponent} from 'vue-demi'
export const nextTwoTick = () =>
  new Promise<void>(resolve => {
    setTimeout(() => {
      setTimeout(resolve)
    })
  })

// Like `until` but works off of any assertion, not application code.
export const retry = (assertion: Function, {interval = 1, timeout = 100} = {}) => {
  return new Promise((resolve, reject) => {
    const startTime = Date.now()

    const tryAgain = () => {
      setTimeout(() => {
        try {
          resolve(assertion())
        } catch (err) {
          Date.now() - startTime > timeout ? reject(err) : tryAgain()
        }
      }, interval)
      try {
        // If useFakeTimers hasn't been called, this will throw
        vitest.advanceTimersByTime(interval)
      } catch (e) {
        /* Expected to throw */
      }
    }

    tryAgain()
  })
}

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
