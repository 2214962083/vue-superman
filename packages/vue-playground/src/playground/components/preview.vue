<script lang="ts">
export default defineComponent({
  name: 'Preview'
})
</script>
<script setup lang="ts">
import Message from './message.vue'
import Loading from './loading.vue'
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
import {CLEAR_CONSOLE_INJECT_KEY, PKG_CDN_INJECT_KEY, STORE_INJECT_KEY, THEME_INJECT_KEY} from '../constants'
import {PreviewExpose} from '../utils/types-helper'

const store = inject(STORE_INJECT_KEY)!
const _clearConsole = inject(CLEAR_CONSOLE_INJECT_KEY, false)
const clearConsole = computed(() => unref(_clearConsole))
const theme = inject(THEME_INJECT_KEY)
const pkgCdn = inject(PKG_CDN_INJECT_KEY, {})

const containerRef = ref<HTMLElement>()
const runtimeError = ref()
const runtimeWarning = ref()
const sandboxUpdateId = ref(0)
const loading = ref(false)

let stopUpdateWatcher: WatchStopHandle | undefined

const preview = new Preview({
  store: store!,
  pkgCdn: unref(pkgCdn),
  onBeforeDestroy() {
    stopUpdateWatcher?.()
  },
  onBeforeLoad() {
    loading.value = true
  },
  onLoad() {
    stopUpdateWatcher = watchEffect(() => {
      if (import.meta.env.PROD && clearConsole.value) {
        console.clear()
      }
      preview.updateSandbox()
      loading.value = false
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
  if (!containerRef.value) return
  preview.createSandbox(containerRef.value)
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
  containerRef,
  sandboxIframe: preview.sandboxEl,
  loading
} as PreviewExpose)
</script>

<template>
  <div class="vue-playground-preview">
    <div ref="containerRef" class="vue-playground-preview-iframe-container"></div>
    <Message :err="runtimeError" />
    <Message v-if="!runtimeError" :warn="runtimeWarning" />
    <Loading v-if="loading" />
  </div>
</template>

<style scoped>
.vue-playground-preview {
  position: relative;
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
