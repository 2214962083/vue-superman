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
import {PLAYGROUND_COMPONENT_NAME, SHOW_IMPORT_MAP_INJECT_KEY, STORE_INJECT_KEY, THEME_INJECT_KEY} from './constants'
import {
  EditorExpose,
  LayoutDirection,
  PlaygroundExpose,
  PlaygroundOptions,
  PlaygroundTheme,
  PreviewExpose
} from './utils/types-helper'
import {isDark} from './hooks'

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

const theme = computed<CSSProperties>(() => {
  const themeColor = '#42b883'
  const lightTheme: PlaygroundTheme = {
    '--editor-theme-name': 'vitesse-light',
    '--theme-color': themeColor,
    '--border-color': '#eaecef',
    '--bg-color': '#fff',
    '--toolbar-bg-color': '##eeeeee',
    '--toolbar-text-color': '#2c3e50',
    '--toolbar-icon-bg-color': '#fff',
    '--toolbar-icon-color': '#999',
    '--toolbar-icon-active-color': themeColor,
    '--preview-bg-color': '#fff',
    '--preview-text-color': '#2c3e50',
    '--file-manager-bg-color': '#fff',
    '--file-manager-text-color': '#94a3b8',
    '--file-manager-active-bg-color': '#fff',
    '--file-manager-active-text-color': themeColor,
    '--file-manager-right-float-bg': 'linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 25%)',
    '--message-warn-text-color': '#695f1b',
    '--message-warn-bg-color': '#f7f0cd',
    '--message-warn-border-color': '#695f1b',
    '--message-error-text-color': '#f00',
    '--message-error-bg-color': '#ffd7d7',
    '--message-error-border-color': '#f00',
    '--message-dismiss-text-color': '#fff',
    '--message-dismiss-bg-color': '#f00'
  }

  const darkTheme: PlaygroundTheme = {
    '--editor-theme-name': 'vitesse-dark',
    '--theme-color': themeColor,
    '--border-color': '#3e4c5a',
    '--bg-color': '#22272e',
    '--toolbar-bg-color': '#262c34',
    '--toolbar-text-color': '#adbac7',
    '--toolbar-icon-bg-color': '#22272e',
    '--toolbar-icon-color': '#adbac7',
    '--toolbar-icon-active-color': themeColor,
    '--preview-bg-color': '#22272e',
    '--preview-text-color': '#fff',
    '--file-manager-bg-color': '#22272e',
    '--file-manager-text-color': '#94a3b8',
    '--file-manager-active-bg-color': '#22272e',
    '--file-manager-active-text-color': themeColor,
    '--file-manager-right-float-bg': 'linear-gradient(90deg, rgba(34, 39, 46, 0) 0%, rgba(34, 39, 46, 1) 25%)',
    '--message-warn-text-color': '#695f1b',
    '--message-warn-bg-color': '#f7f0cd',
    '--message-warn-border-color': '#695f1b',
    '--message-error-text-color': '#f00',
    '--message-error-bg-color': '#ffd7d7',
    '--message-error-border-color': '#f00',
    '--message-dismiss-text-color': '#fff',
    '--message-dismiss-bg-color': '#f00'
  }

  return isDark.value ? darkTheme : lightTheme
})

provide(STORE_INJECT_KEY, store)
provide(SHOW_IMPORT_MAP_INJECT_KEY, true)
provide(THEME_INJECT_KEY, theme)
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
      :style="theme"
    >
      <Toolbar
        v-model:showCode="showCode"
        v-model:fullScreen="fullScreen"
        v-model:layoutDirection="layoutDirection"
        v-model:showDark="isDark"
      ></Toolbar>
      <div class="vue-playground-content" :style="contentStyle">
        <Preview
          :style="{
            borderTop: layoutDirection === 'EditorTopPreviewBottom' ? '1px solid var(--border-color)' : 'none',
            borderRight: layoutDirection === 'EditorRightPreviewLeft' ? '1px solid var(--border-color)' : 'none'
          }"
        ></Preview>
        <Editor
          v-show="showCode"
          ref="EditorRef"
          :life-cycle="options.lifeCycle"
          :style="{
            borderTop: layoutDirection === 'EditorBottomPreviewTop' ? '1px solid var(--border-color)' : 'none',
            borderRight: layoutDirection === 'EditorLeftPreviewRight' ? '1px solid var(--border-color)' : 'none'
          }"
        ></Editor>
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
  background-color: var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: 8px;
}

.vue-playground.vue-playground-fullscreen {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99999;
  width: 100%;
  height: 100%;
  overscroll-behavior: none;
  border: none;
  border-radius: 0;
  -ms-scroll-chaining: none;
}

.vue-playground-content {
  display: flex;
  width: 100%;
  height: 100%;
}
</style>
