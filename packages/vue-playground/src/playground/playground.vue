<script lang="ts">
export default defineComponent({
  name: PLAYGROUND_COMPONENT_NAME
})
</script>
<script lang="ts" setup>
import {defineComponent, onMounted, PropType, provide, ref} from 'vue'
import {ReplStore} from '../core'
import Editor from './components/editor.vue'
import Preview from './components/preview.vue'
import {PLAYGROUND_COMPONENT_NAME, SHOW_IMPORT_MAP_INJECT_KEY, STORE_INJECT_KEY} from './constants'
import {EditorExpose, PlaygroundExpose, PlaygroundOptions, PreviewExpose} from './utils/types-helper'

const props = defineProps({
  options: {
    type: Object as PropType<PlaygroundOptions>,
    default: () => ({})
  }
})

const previewRef = ref<PreviewExpose>()
const editorRef = ref<EditorExpose>()

const store = new ReplStore({
  initFiles: props.options.files
})

provide(STORE_INJECT_KEY, store)
provide(SHOW_IMPORT_MAP_INJECT_KEY, true)
onMounted(() => {
  console.log('onMounted', store)
})

defineExpose({
  store,
  preview: previewRef,
  editor: editorRef
} as PlaygroundExpose)
</script>
<template>
  <div>
    vue playground
    <preview></preview>
    <editor ref="editorRef" :life-cycle="options.lifeCycle"></editor>
  </div>
</template>
<style lang="scss" scoped></style>
