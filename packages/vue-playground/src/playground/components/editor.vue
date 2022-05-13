<script lang="ts">
export default defineComponent({
  name: 'Editor'
})
</script>
<script setup lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */
import {ref, defineComponent, inject, computed, PropType, toRefs} from 'vue'
import {debounce, File} from '../../core'
import {STORE_INJECT_KEY} from '../constants'
import {useMonaco} from '../hooks/useMonaco'
import {EditorExpose, PlaygroundLifeCycle} from '../utils/types-helper'
import FileManagerBar from './file-manager-bar.vue'
import Message from './message.vue'

const props = defineProps({
  lifeCycle: {
    type: Object as PropType<PlaygroundLifeCycle>
  }
})

interface Emits {
  (e: 'change', value: string): void
}

const emit = defineEmits<Emits>()

const {lifeCycle} = toRefs(props)
const store = inject(STORE_INJECT_KEY)!

const editorEl = ref<HTMLElement>()
const files = computed(() => Object.values(store.state.files))
const activeFile = computed(() => store.state.activeFile)

const {getEditor, onChange, isDark, toggleDark, disposeEditor} = useMonaco(editorEl, {
  lifeCycle,
  files,
  activeFile
})

const handleChange = debounce(({newCode, activeFile}: {newCode: string; activeFile: File}) => {
  store.state.activeFile.code = newCode
  lifeCycle?.value?.onCodeChange?.({
    newCode,
    activeFile
  })
  emit('change', newCode)
}, 250)

defineExpose({
  getEditor,
  isDark,
  toggleDark,
  disposeEditor
} as EditorExpose)

onChange(handleChange)
</script>

<template>
  <div class="vue-playground-editor">
    <FileManagerBar />
    <div class="vue-playground-editor-container">
      <div ref="editorEl" class="vue-playground-editor-monaco"></div>
      <Message :err="store.state.errors[0]" />
    </div>
  </div>
</template>

<style scoped>
.vue-playground-editor {
  position: relative;
  flex: 1;
  width: 100%;
  height: 50%;
  min-height: 320px;
  border-top: 1px solid #e5e7eb;
}

.vue-playground-editor-container {
  position: absolute;
  top: 40px;
  flex: 1;
  width: 100%;
  height: calc(100% - 40px);
  overflow: hidden;
}
.vue-playground-editor-monaco {
  top: 0;
  width: 100%;
  height: 100%;
}
</style>
