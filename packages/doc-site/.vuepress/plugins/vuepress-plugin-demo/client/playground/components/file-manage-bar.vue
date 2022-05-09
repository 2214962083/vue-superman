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

const fileSel = ref(null)
function horizontalScroll(e: WheelEvent) {
  e.preventDefault()
  const el = fileSel.value! as HTMLElement
  const direction = Math.abs(e.deltaX) >= Math.abs(e.deltaY) ? e.deltaX : e.deltaY
  const distance = 30 * (direction > 0 ? 1 : -1)
  el.scrollTo({
    left: el.scrollLeft + distance
  })
}
</script>

<template>
  <div ref="fileSel" class="file-selector" :class="{'has-import-map': showImportMap}" @wheel="horizontalScroll">
    <div
      v-for="(fileName, i) in fileNames"
      :key="i"
      class="file"
      :class="{active: store.state.activeFile.filename === fileName}"
      @click="store.setActive(fileName)"
    >
      <span class="label">{{ fileName === importMapFile ? 'Import Map' : fileName }}</span>
      <span v-if="i > 0" class="remove" @click.stop="store.deleteFile(fileName)">
        <svg class="icon" width="12" height="12" viewBox="0 0 24 24">
          <line stroke="#999" x1="18" y1="6" x2="6" y2="18"></line>
          <line stroke="#999" x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </span>
    </div>
    <div v-if="pending" class="file pending">
      <input
        v-model="pendingFilename"
        spellcheck="false"
        @blur="doneAddFile"
        @keyup.enter="doneAddFile"
        @keyup.esc="cancelAddFile"
        @vnodeMounted="focus"
      />
    </div>
    <button class="add" @click="startAddFile">+</button>

    <div v-if="showImportMap" class="import-map-wrapper">
      <div
        class="file import-map"
        :class="{active: store.state.activeFile.filename === importMapFile}"
        @click="store.setActive(importMapFile)"
      >
        <span class="label">Import Map</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.file-selector {
  position: relative;
  box-sizing: border-box;
  display: flex;
  height: var(--header-height);
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  background-color: var(--bg);
  border-bottom: 1px solid var(--border);
}

.file-selector::-webkit-scrollbar {
  height: 1px;
}

.file-selector::-webkit-scrollbar-track {
  background-color: var(--border);
}

.file-selector::-webkit-scrollbar-thumb {
  background-color: var(--color-branding);
}

.file-selector.has-import-map .add {
  margin-right: 10px;
}

.file {
  box-sizing: border-box;
  display: inline-block;
  font-family: var(--font-code);
  font-size: 13px;
  color: var(--text-light);
  cursor: pointer;
}
.file.active {
  color: var(--color-branding);
  cursor: text;
  border-bottom: 3px solid var(--color-branding);
}
.file span {
  display: inline-block;
  padding: 8px 10px 6px;
  line-height: 20px;
}
.file.pending input {
  width: 90px;
  height: 30px;
  padding: 0 0 0 10px;
  margin-top: 2px;
  margin-left: 6px;
  font-family: var(--font-code);
  font-size: 12px;
  line-height: 30px;
  border: 1px solid var(--border);
  border-radius: 4px;
  outline: none;
}
.file .remove {
  display: inline-block;
  padding-left: 0;
  line-height: 12px;
  vertical-align: middle;
  cursor: pointer;
}
.add {
  position: relative;
  top: -1px;
  margin-left: 6px;
  font-family: var(--font-code);
  font-size: 18px;
  color: #999;
  vertical-align: middle;
}
.add:hover {
  color: var(--color-branding);
}
.icon {
  margin-top: -1px;
}
.import-map-wrapper {
  position: sticky;
  top: 0;
  right: 0;
  padding-left: 30px;
  margin-left: auto;
  background: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 25%);
  background-color: var(--bg);
}
.dark .import-map-wrapper {
  background: linear-gradient(90deg, rgba(26, 26, 26, 0) 0%, rgba(26, 26, 26, 1) 25%);
}
</style>
