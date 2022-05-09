<script lang="ts">
export default defineComponent({
  name: 'Editor'
})
</script>
<script setup lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */
import {ref, defineComponent, inject, computed} from 'vue'
import {STORE_INJECT_KEY} from '../constants'
import {useMonaco} from '../hooks/useMonaco'
import FileManageBar from './file-manage-bar.vue'
import Message from './message.vue'

interface Emits {
  (e: 'change', value: string): void
}

const emit = defineEmits<Emits>()

const store = inject(STORE_INJECT_KEY)!

const editorEl = ref<HTMLElement>()
const files = computed(() => Object.values(store.state.files))
const activeFile = computed(() => store.state.activeFile)

const {editor, onChange, isDark, toggleDark} = useMonaco(editorEl, {
  id: '',
  files,
  activeFile
})

onChange(({newCode, activeFile}) => {
  const newFiles = [...files.value]
  const activeFileName = activeFile.filename
  const idx = newFiles.findIndex(file => file.filename === activeFileName)
  if (idx !== -1) newFiles[idx] = {...newFiles[idx], code: newCode}
  emit('change', newCode)
})
</script>

<template>
  <div>
    <FileManageBar />
    <div class="editor-container">
      <div ref="editorEl" style="width: 100%; height: 600px"></div>
      <Message :err="store.state.errors[0]" />
    </div>
  </div>
</template>

<style scoped>
.editor-container {
  position: relative;
  height: calc(100% - var(--header-height));
  overflow: hidden;
}
</style>
