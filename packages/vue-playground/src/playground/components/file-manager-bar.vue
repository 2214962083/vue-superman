<script setup lang="ts">
import {computed, inject, ref, VNode} from 'vue'
import {DEFAULT_FILE_NAME, IMPORT_JSON_NAME, SHOW_IMPORT_MAP_INJECT_KEY, STORE_INJECT_KEY} from '../constants'

const store = inject(STORE_INJECT_KEY)!

const pending = ref(false)
const pendingFilename = ref(DEFAULT_FILE_NAME)
const importMapFile = IMPORT_JSON_NAME
const showImportMap = inject(SHOW_IMPORT_MAP_INJECT_KEY)
const fileNames = computed(() =>
  Object.entries(store.state.files)
    .filter(([name, file]) => name !== importMapFile && !file.hidden)
    .map(([name]) => name)
)

function startAddFile() {
  pending.value = true
}

function cancelAddFile() {
  pending.value = false
}

function focus({el}: VNode) {
  ;(el as HTMLInputElement).focus()
}

function doneAddFile() {
  const filename = pendingFilename.value
  if (!pending.value) return
  if (!/\.(vue|js|ts|css|tsx|jsx)$/.test(filename)) {
    store.state.errors = [`Playground only supports *.vue, *.js, *.ts, '*.jsx', '*.tsx', *.css files.`]
    return
  }

  if (filename in store.state.files) {
    store.state.errors = [`File "${filename}" already exists.`]
    return
  }

  store.state.errors = []
  cancelAddFile()
  store.addFile(filename)
  pendingFilename.value = DEFAULT_FILE_NAME
}

const fileManagerBarRef = ref(null)
function horizontalScroll(e: WheelEvent) {
  e.preventDefault()
  const el = fileManagerBarRef.value! as HTMLElement
  const direction = Math.abs(e.deltaX) >= Math.abs(e.deltaY) ? e.deltaX : e.deltaY
  const distance = 30 * (direction > 0 ? 1 : -1)
  el.scrollTo({
    left: el.scrollLeft + distance
  })
}
</script>

<template>
  <div
    ref="fileManagerBarRef"
    class="vue-playground-file-manager-bar"
    :class="{'vue-playground-file-manager-bar-has-import-map': showImportMap}"
    @wheel="horizontalScroll"
  >
    <div
      v-for="(fileName, i) in fileNames"
      :key="i"
      class="vue-playground-file-manager-bar-file"
      :class="{'vue-playground-file-manager-bar-file-active': store.state.activeFile.filename === fileName}"
      @click="store.setActive(fileName)"
    >
      <span class="vue-playground-file-manager-bar-file-filename">{{
        fileName === importMapFile ? 'Import Map' : fileName
      }}</span>
      <span v-if="i > 0" class="vue-playground-file-manager-bar-file-remove" @click.stop="store.deleteFile(fileName)">
        <svg class="vue-playground-file-manager-bar-file-remove-icon" width="12" height="12" viewBox="0 0 24 24">
          <line stroke="#999" x1="18" y1="6" x2="6" y2="18"></line>
          <line stroke="#999" x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </span>
    </div>
    <div v-if="pending" class="vue-playground-file-manager-bar-pending">
      <input
        v-model="pendingFilename"
        spellcheck="false"
        @blur="doneAddFile"
        @keyup.enter="doneAddFile"
        @keyup.esc="cancelAddFile"
        @vnodeMounted="focus"
      />
    </div>

    <div class="vue-playground-file-manager-bar-create-btn" @click="startAddFile">+</div>

    <div v-if="showImportMap" class="vue-playground-file-manager-bar-import-map-wrapper">
      <div
        class="vue-playground-file-manager-bar-import-map"
        :class="{active: store.state.activeFile.filename === importMapFile}"
        @click="store.setActive(importMapFile)"
      >
        <span class="vue-playground-file-manager-bar-import-map-name">Import Map</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.vue-playground-file-manager-bar {
  position: relative;
  box-sizing: border-box;
  display: flex;
  flex-shrink: 0;
  width: 100%;
  height: 40px;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  background-color: var(--file-manager-bg-color);
  border-bottom: 1px solid var(--border-color);
}

.vue-playground-file-manager-bar::-webkit-scrollbar {
  height: 1px;
}

.vue-playground-file-manager-bar::-webkit-scrollbar-track {
  background-color: var(--border-color);
}

.vue-playground-file-manager-bar::-webkit-scrollbar-thumb {
  background-color: var(--theme-color);
}

.vue-playground-file-manager-bar-has-import-map .vue-playground-file-manager-bar-create-btn {
  margin-right: 10px;
}

.vue-playground-file-manager-bar-file {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 8px;
  margin: 2px 2px 0;
  font-size: 12px;
  font-weight: 600;
  color: var(--file-manager-text-color);
  cursor: pointer;
  user-select: none;
  background-color: var(--file-manager-bg-color);
  border-bottom: 3px solid transparent;
}

.vue-playground-file-manager-bar-file-active {
  color: var(--file-manager-active-text-color);
  cursor: text;
  background-color: var(--file-manager-active-bg-color);
  border-bottom: 3px solid var(--file-manager-active-text-color);
}

.vue-playground-file-manager-bar-file span {
  display: flex;
  padding: 8px 10px 6px;
  line-height: 20px;
}

.vue-playground-file-manager-bar-file-remove {
  display: flex;
  padding-left: 0;
  line-height: 12px;
  vertical-align: middle;
  cursor: pointer;
}

.vue-playground-file-manager-bar-file-remove-icon {
  margin-top: -1px;
}

.vue-playground-file-manager-bar-pending {
  display: flex;
  align-items: center;
  justify-content: center;
}

.vue-playground-file-manager-bar-pending input {
  width: 90px;
  height: 30px;
  padding: 0 0 0 10px;
  margin-top: 2px;
  margin-left: 6px;
  font-size: 12px;
  line-height: 30px;
  color: var(--file-manager-active-text-color);
  background-color: var(--file-manager-active-bg-color);
  border: 1px solid var(--file-manager-active-text-color);
  border-radius: 4px;
  outline: none;
}

.vue-playground-file-manager-bar-create-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 6px;
  font-size: 18px;
  color: var(--file-manager-text-color);
  cursor: pointer;
}

.vue-playground-file-manager-bar-create-btn:hover {
  color: var(--file-manager-active-text-color);
}

.vue-playground-file-manager-bar-import-map-wrapper {
  position: sticky;
  top: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 15px;
  margin-left: auto;
  font-size: 12px;
  color: var(--file-manager-text-color);
  cursor: pointer;
  background: var(--file-manager-right-float-bg);
}
</style>
