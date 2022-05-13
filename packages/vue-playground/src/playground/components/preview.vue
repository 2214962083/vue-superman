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
import {Preview, PreviewProxy} from '../../core/'
import {CLEAR_CONSOLE_INJECT_KEY, STORE_INJECT_KEY} from '../constants'
import {PreviewExpose} from '../utils/types-helper'

const store = inject(STORE_INJECT_KEY)!
const _clearConsole = inject(CLEAR_CONSOLE_INJECT_KEY, false)
const clearConsole = computed(() => unref(_clearConsole))
const container = ref<HTMLElement>()
const runtimeError = ref()
const runtimeWarning = ref()

let proxy: PreviewProxy

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

onUnmounted(() => {
  proxy.destroy()
})

defineExpose({
  container,
  sandboxIframe: preview.sandboxEl
} as PreviewExpose)
</script>

<template>
  <div class="preview">
    <div ref="container" class="iframe-container"></div>
    <Message :err="runtimeError" />
    <Message v-if="!runtimeError" :warn="runtimeWarning" />
  </div>
</template>

<style scoped>
.iframe-container,
.iframe-container :deep(iframe) {
  width: 100%;
  height: 100%;
  background-color: #fff;
  border: none;
}
</style>
