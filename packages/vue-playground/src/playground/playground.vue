<script lang="ts">
export default defineComponent({
  name: PLAYGROUND_COMPONENT_NAME
})
</script>
<script lang="ts" setup>
import {computed, CSSProperties, defineComponent, inject, onMounted, provide, ref, unref, watch} from 'vue'
import {ReplStore} from '../core'
import Toolbar from './components/toolbar.vue'
import Editor from './components/editor.vue'
import Preview from './components/preview.vue'
import Loading from './components/loading.vue'
import Portal from './components/portal'
import {
  GET_DARK_THEME,
  GET_LIGHT_THEME,
  PLAYGROUND_COMPONENT_NAME,
  SHOW_DARK_MODE_INJECT_KEY,
  SHOW_IMPORT_MAP_INJECT_KEY,
  STORE_INJECT_KEY,
  THEME_INJECT_KEY
} from './constants'
import {EditorExpose, LayoutDirection, PlaygroundExpose, PlaygroundTheme, PreviewExpose} from './utils/types-helper'
import {isDark, toggleDark} from './hooks'
import {playgroundProps} from './playground.type'

const props = defineProps(playgroundProps())

const previewRef = ref<PreviewExpose>()
const editorRef = ref<EditorExpose>()

const store = new ReplStore({
  initFiles: props.files,
  initImportMap: props.importMap
})

const showDarkMode = inject(SHOW_DARK_MODE_INJECT_KEY, undefined)
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
  const lightTheme: PlaygroundTheme = GET_LIGHT_THEME(props?.themes?.light)
  const darkTheme: PlaygroundTheme = GET_DARK_THEME(props?.themes?.dark)
  return isDark.value ? darkTheme : lightTheme
})

watch(
  isDark,
  val => {
    props?.lifeCycle?.onDarkModeChange?.(val)
  },
  {
    immediate: true
  }
)

watch(
  () => unref(showDarkMode),
  val => {
    if (val !== null && val !== undefined) toggleDark(val)
  },
  {
    immediate: true
  }
)

provide(STORE_INJECT_KEY, store)
provide(SHOW_IMPORT_MAP_INJECT_KEY, true)
provide(THEME_INJECT_KEY, theme)
onMounted(() => {
  console.log('onMounted', store)
})

defineExpose({
  store,
  preview: previewRef,
  editor: editorRef,
  isDark,
  toggleDark
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
          ref="previewRef"
          :style="{
            borderTop: layoutDirection === 'EditorTopPreviewBottom' ? '1px solid var(--border-color)' : 'none',
            borderRight: layoutDirection === 'EditorRightPreviewLeft' ? '1px solid var(--border-color)' : 'none'
          }"
        ></Preview>
        <Editor
          v-show="showCode"
          ref="editorRef"
          :life-cycle="lifeCycle"
          :style="{
            borderTop: layoutDirection === 'EditorBottomPreviewTop' ? '1px solid var(--border-color)' : 'none',
            borderRight: layoutDirection === 'EditorLeftPreviewRight' ? '1px solid var(--border-color)' : 'none'
          }"
        ></Editor>
      </div>
      <Loading v-if="!editorRef || editorRef.loading" />
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
