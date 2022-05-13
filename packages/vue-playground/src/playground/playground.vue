<script lang="ts">
export default defineComponent({
  name: PLAYGROUND_COMPONENT_NAME
})
</script>
<script lang="ts" setup>
import {computed, CSSProperties, defineComponent, onMounted, PropType, provide, ref} from 'vue'
import {ReplStore} from '../core'
import Toolbar from './components/toolbar.vue'
import Editor from './components/editor.vue'
import Preview from './components/preview.vue'
import Portal from './components/portal'
import {PLAYGROUND_COMPONENT_NAME, SHOW_IMPORT_MAP_INJECT_KEY, STORE_INJECT_KEY} from './constants'
import {EditorExpose, LayoutDirection, PlaygroundExpose, PlaygroundOptions, PreviewExpose} from './utils/types-helper'

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

const showCode = ref(true)
const fullScreen = ref(false)
const layoutDirection = ref<LayoutDirection>('EditorBottomPreviewTop')

const contentStyle = computed<CSSProperties>(() => {
  const directionStyleMap: Record<LayoutDirection, CSSProperties> = {
    EditorBottomPreviewTop: {
      flexDirection: 'column'
    },
    EditorRightPreviewLeft: {
      flexDirection: 'row'
    },
    EditorTopPreviewBottom: {
      flexDirection: 'column-reverse'
    },
    EditorLeftPreviewRight: {
      flexDirection: 'row-reverse'
    }
  }

  return {
    ...directionStyleMap[layoutDirection.value]
  }
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
  <Portal :to="fullScreen ? 'body' : undefined">
    <div
      class="vue-playground"
      :class="{
        'vue-playground-fullscreen': fullScreen
      }"
    >
      <Toolbar
        v-model:showCode="showCode"
        v-model:fullScreen="fullScreen"
        v-model:layoutDirection="layoutDirection"
      ></Toolbar>
      <div class="vue-playground-content" :style="contentStyle">
        <Preview></Preview>
        <Editor v-show="showCode" ref="EditorRef" :life-cycle="options.lifeCycle"></Editor>
      </div>
    </div>
  </Portal>
</template>
<style scoped>
.vue-playground {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow: hidden;
  background-color: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
}

.vue-playground-fullscreen {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99999;
  width: 100%;
  height: 100%;
  overscroll-behavior: none;
  -ms-scroll-chaining: none;
}

.vue-playground-content {
  display: flex;
  width: 100%;
}
</style>
