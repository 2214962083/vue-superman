<script lang="ts">
export default defineComponent({
  name: 'Preview'
})
</script>
<script setup lang="ts">
import Message from './message.vue'
import {
  defineComponent,
  ref,
  onMounted,
  onUnmounted,
  watchEffect,
  watch,
  WatchStopHandle,
  inject,
  computed,
  unref
} from 'vue'
import {Preview} from '../../core/'
import {CLEAR_CONSOLE_INJECT_KEY, STORE_INJECT_KEY, THEME_INJECT_KEY} from '../constants'
import {PreviewExpose} from '../utils/types-helper'

const store = inject(STORE_INJECT_KEY)!
const _clearConsole = inject(CLEAR_CONSOLE_INJECT_KEY, false)
const clearConsole = computed(() => unref(_clearConsole))
const theme = inject(THEME_INJECT_KEY)
const container = ref<HTMLElement>()
const runtimeError = ref()
const runtimeWarning = ref()
const sandboxUpdateId = ref(0)

let stopUpdateWatcher: WatchStopHandle | undefined

const preview = new Preview({
  store: store!,
  onBeforeDestroy() {
    stopUpdateWatcher?.()
  },
  onLoad() {
    stopUpdateWatcher = watchEffect(() => {
      if (import.meta.env.PROD && clearConsole.value) {
        console.clear()
      }
      preview.updateSandbox()
      sandboxUpdateId.value++
    })
  },
  onError(err) {
    runtimeError.value = err
  },
  onWarning(warn) {
    runtimeWarning.value = warn
  }
})

const createSandbox = () => {
  if (!container.value) return
  preview.createSandbox(container.value)
}

// create sandbox on mount
onMounted(() => {
  createSandbox()
})

// reset sandbox when import map changes
watch(
  () => store.state.files['import-map.json'].code,
  raw => {
    try {
      const map = JSON.parse(raw)
      if (!map.imports) return (store.state.errors = [`import-map.json is missing "imports" field.`])
      createSandbox()
    } catch (e: unknown) {
      store.state.errors = [e as Error]
      return
    }
  }
)

// reset sandbox when version changes
watch(
  () => store.state.vueRuntimeURL,
  () => createSandbox()
)

watch(
  () => [sandboxUpdateId.value, unref(theme)],
  () => {
    if (!preview.sandboxEl?.contentDocument?.documentElement) return
    const cssVars = unref(theme)
    const iframeDocument = preview.sandboxEl.contentDocument

    Object.assign(iframeDocument.body.style, {
      ...cssVars,
      color: cssVars?.['--preview-text-color'] || '#000',
      backgroundColor: cssVars?.['--preview-bg-color'] || '#fff'
    })
  },
  {
    deep: true,
    immediate: true
  }
)

onUnmounted(() => {
  preview.destroy()
})

defineExpose({
  container,
  sandboxIframe: preview.sandboxEl
} as PreviewExpose)
</script>

<template>
  <div class="vue-playground-preview">
    <div ref="container" class="vue-playground-preview-iframe-container"></div>
    <Message :err="runtimeError" />
    <Message v-if="!runtimeError" :warn="runtimeWarning" />
  </div>
</template>

<style scoped>
.vue-playground-preview {
  box-sizing: border-box;
  flex: 1;
  width: 100%;
  overflow: hidden;
}
.vue-playground-preview-iframe-container,
.vue-playground-preview-iframe-container :deep(iframe) {
  width: 100%;
  height: 100%;
  color: var(--preview-text-color);
  background-color: var(--preview-bg-color);
  border: none;
}
</style>
