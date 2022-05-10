<script lang="ts">
export default defineComponent({
  name: 'Editor'
})
</script>
<script setup lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */
import {ref, defineComponent, inject, computed} from 'vue'
import {debounce} from '../../core'
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

const {getEditor, onChange, isDark, toggleDark} = useMonaco(editorEl, {
  files,
  activeFile
})

const handleChange = debounce(({newCode, activeFile}: {newCode: string; activeFile: File}) => {
  store.state.activeFile.code = newCode
  emit('change', newCode)
}, 250)

onChange(handleChange)
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
