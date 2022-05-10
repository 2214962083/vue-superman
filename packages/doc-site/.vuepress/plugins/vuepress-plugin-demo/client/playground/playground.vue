<script lang="ts">
export default defineComponent({
  name: 'Playground'
})
</script>
<script lang="ts" setup>
import {defineComponent, onMounted, PropType, provide} from 'vue'
import {File, ReplStore} from '../core'
import Editor from './components/editor.vue'
import Preview from './components/preview.vue'
import {SHOW_IMPORT_MAP_INJECT_KEY, STORE_INJECT_KEY} from './constants'

interface PlaygroundOptions {
  files: File[]
}

const props = defineProps({
  options: {
    type: Object as PropType<PlaygroundOptions>,
    default: () => ({})
  }
})

const store = new ReplStore({
  initFiles: props.options.files
})

provide(STORE_INJECT_KEY, store)
provide(SHOW_IMPORT_MAP_INJECT_KEY, true)
onMounted(() => {
  console.log('onMounted', store)
})
</script>
<template>
  <div>
    vue playground
    <preview></preview>
    <editor></editor>
  </div>
</template>
<style lang="scss" scoped></style>
