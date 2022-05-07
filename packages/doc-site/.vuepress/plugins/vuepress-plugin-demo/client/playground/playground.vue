<template>
  <div>vue playground</div>
</template>

<script lang="ts">
import {defineComponent, onMounted, PropType, toRefs} from 'vue'
import {File, ReplStore} from '../core/store'

interface Options {
  files: File[]
}

export default defineComponent({
  name: 'Playground',
  props: {
    options: {
      type: Object as PropType<Options>,
      default: () => ({})
    }
  },
  setup(props) {
    const {options} = toRefs(props)

    const store = new ReplStore({
      initFiles: options.value.files
    })

    onMounted(() => {
      console.log('onMounted', store)
    })
  }
})
</script>

<style lang="scss" scoped></style>
