<script lang="ts">
export default defineComponent({
  name: 'Playground'
})
</script>
<script lang="ts" setup>
import {defineComponent, onMounted, PropType} from 'vue'
import {File, ReplStore} from '../core/store'
import * as monaco from 'monaco-editor'
import Editor from './components/editor.vue'

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

onMounted(() => {
  console.log('onMounted', store)
})

const getLanguageFromFile = (file: File) => {
  const ext = file.filename.split('.').pop()
  switch (ext) {
    case 'js':
    case 'jsx':
      return 'javascript'
    case 'ts':
    case 'tsx':
      return 'typescript'
    case 'vue':
      return 'html'
    case 'css':
      return 'css'
    default:
      return 'plaintext'
  }
}

const activeFile = store.state.activeFile
const model = monaco.editor.createModel(
  activeFile.code,
  getLanguageFromFile(activeFile),
  monaco.Uri.parse(`file:///root/${activeFile.filename}`)
)
</script>
<template>
  <div>
    vue playground
    <editor :model="model"></editor>
  </div>
</template>
<style lang="scss" scoped></style>
