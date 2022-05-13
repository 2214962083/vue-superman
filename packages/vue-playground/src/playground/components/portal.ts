/* eslint-disable @typescript-eslint/no-explicit-any */
import {defineComponent, h, Teleport} from 'vue'

const vm = defineComponent({
  name: 'Portal',
  props: {
    to: {
      type: String
    }
  },
  render() {
    const {to} = this
    if (!to) return this.$slots.default?.()
    return h(
      Teleport as any,
      {
        to
      },
      this.$slots.default?.()
    )
  }
})

export default vm
